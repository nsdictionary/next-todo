import React from "react";
import styled from "styled-components";

const Container = styled.div.attrs({
  className:
    "flex border-b border-gray-200 border-solid text-2xl items-center w-full h-11 py-0 pl-3",
})``;

const Header: React.FC = () => {
  return (
    <Container>
      <h1>Todo List</h1>
    </Container>
  );
};

export default Header;
