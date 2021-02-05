import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const Container = styled.footer.attrs({
  className:
    "fixed w-f h-12 flex justify-center items-center bottom-0 inset-x-0 bg-white border-t border-solid border-gray-200",
})``;

const FooterButton = styled.div.attrs({
  className:
    "text-4xl w-8 h-8 border border-solid border-black flex justify-center items-center rounded-lg focus:outline-none",
})``;

const Footer: React.FC = () => {
  const router = useRouter();
  const isMain = router.pathname === "/";

  return (
    <Container>
      <FooterButton
        as="button"
        type="button"
        onClick={() => router.push(isMain ? "/todo/add" : "/")}
      >
        {isMain ? "+" : "-"}
      </FooterButton>
    </Container>
  );
};

export default Footer;
