//@ts-nocheck
import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { clerkClient } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  if (!webhookSecret) {
    throw new Error("Stripe webhook secret is not set");
  }
  if (!stripe) {
    throw new Error("Stripe is not set");
  }

  const body = await req.text();
  const clerk = await clerkClient();

  const headerss = await headers();
  const signature = headerss.get("stripe-signature");
  if (!signature) {
    throw new Error("Stripe signature is not set");
  }
  let data;
  let eventType;
  let event;

  // verify Stripe event is legit
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
  data = event.data;
  eventType = event.type;

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
        // ✅ Grant access to the product
        const session = await stripe.checkout.sessions.retrieve(
          //@ts-ignore
          data.object.id,
          {
            expand: ["line_items"],
          }
        );
        if (!session) {
          throw new Error("Session not found");
        }
        const customerId = session?.customer;
        if (!customerId) {
          throw new Error("Customer ID not found");
        }
        const customer = await stripe.customers.retrieve(customerId);
        const priceId = session?.line_items?.data[0]?.price.id;

        if (customer?.email) {
          const user = await clerk.users.getUserList({
            emailAddress: customer.email,
          });

          if (user.data.length > 1) {
            throw new Error("Multiple users found");
          }
          if (user.data.length === 0) {
            const newUser = await clerk.users.createUser({
              emailAddress: [customer.email],
              firstName: customer.name,
              publicMetadata: {
                priceId,
                hasAccess: true,
              },
              privateMetadata: {
                customerId,
              },
            });
            return NextResponse.json({ message: "success" }, { status: 200 });
          }
          const currentUser = (
            await clerk.users.getUserList({
              emailAddress: customer.email,
            })
          ).data[0];

          await clerk.users.updateUserMetadata(currentUser.id, {
            publicMetadata: {
              priceId,
              hasAccess: true,
            },
            privateMetadata: {
              customerId,
            },
          });
        } else {
          console.error("No user found");
          throw new Error("No user found");
        }

        // Extra: >>>>> send email to dashboard <<<<

        break;
      }

      case "customer.subscription.deleted": {
        // ❌ Revoke access to the product
        // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
        const subscription = await stripe.subscriptions.retrieve(
          data.object.id
        );
        const user = await clerk.users.getUserList({
          privateMetadata: {
            customerId: subscription.customer,
          },
        });
        if (user.data.length === 0) {
          throw new Error("User not found");
        }
        if (user.data.length > 1) {
          throw new Error("Multiple users found");
        }
        const currentUser = user.data[0];
        await clerk.users.updateUserMetadata(currentUser.id, {
          publicMetadata: {
            hasAccess: false,
          },
        });
        break;
      }

      default:
      // Unhandled event type
    }
  } catch (e: any) {
    console.error("stripe error: " + e.message + " | EVENT TYPE: " + eventType);
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
  return NextResponse.json({ message: "success" }, { status: 200 });
}
