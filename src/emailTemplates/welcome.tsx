import { APP_NAME } from "@/lib/constants";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface TemplateWelcomeEmailProps {
  userFirstname: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const TemplateWelcomeEmail = ({
  userFirstname,
}: TemplateWelcomeEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>
        The sales intelligence platform that helps you uncover qualified leads.
      </Preview>
      <Container style={container}>
        <Img
          src={`${baseUrl}/static/{APP_NAME}-logo.png`}
          width="170"
          height="50"
          alt="{APP_NAME}"
          style={logo}
        />
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Welcome to {APP_NAME}, the sales intelligence platform that helps you
          uncover qualified leads and close deals faster.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href="https://get{APP_NAME}.com">
            Get started
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The {APP_NAME} team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          470 Noor Ave STE B #1148, South San Francisco, CA 94080
        </Text>
      </Container>
    </Body>
  </Html>
);

TemplateWelcomeEmail.PreviewProps = {
  userFirstname: "Alan",
} as TemplateWelcomeEmailProps;

export default TemplateWelcomeEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
