export const APP_NAME = "Template";
export const logoPath = "/logo.png";

export const BeforeLoginNavbarRoutes = [
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "Pricing",
    href: "#pricing",
  },
  {
    label: "Contact",
    href: "#contact",
  },
  {
    label: "About",
    href: "#about",
  },
];

export const AfterLoginNavbarRoutes = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Profile",
    href: "/profile",
  },
];

export const pricingPlans = [
  {
    name: "Pro",
    price: 199,
    description: "For small organizations with simple needs.",
    link: "https://buy.stripe.com/test_fZe02I0c7bDR9gs5kk",
    priceId: "price_1R98niQ9JsN7rupJoqkcdIF7",
    features: ["1000 messages", "1000 images", "1000 videos"],
    cta: "Choose Plan",
    popular: false,
  },
  {
    name: "Professional",
    price: 1999,
    description: "For large organizations with complex needs.",
    link: "https://buy.stripe.com/test_fZe02I0c7bDR9gs5kk",
    priceId: "price_1R98niQ9JsN7rupJoqkcdIF7",
    features: ["1000 messages", "1000 images", "1000 videos"],
    cta: "Choose Plan",
    popular: true,
  },
  {
    name: "Enterprise",
    price: 19999,
    description: "For large organizations with complex needs.",
    link: "https://buy.stripe.com/test_fZe02I0c7bDR9gs5kk",
    priceId: "price_1R98niQ9JsN7rupJoqkcdIF7",
    features: ["1000 messages", "1000 images", "1000 videos"],
    cta: "Choose Plan",
    popular: false,
  },
];
