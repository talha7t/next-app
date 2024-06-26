import React, { CSSProperties } from "react";
import {
  Html,
  Body,
  Container,
  Text,
  Tailwind,
  Link,
  Preview,
} from "@react-email/components";

interface Props {
  name: string;
}

const WelcomeTemplate = ({ name }: Props) => {
  return (
    <Html>
      <Preview>Welcome aboard!</Preview>

      <Tailwind>
        {/* need to wrap body in tailwind tag to use its classes */}
        <Body className="bg-white"> 
          <Container>
            <Text className="font-bold text-3xl">Hello World {name}</Text>
            <Link href="https://www.google.com">Google</Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const body: CSSProperties = {
  backgroundColor: "#fff",
};

const heading: CSSProperties = {
  fontSize: "32px",
};

export default WelcomeTemplate;
