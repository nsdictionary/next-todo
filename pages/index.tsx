import React from "react";
import { NextPage } from "next";
import styled from "styled-components";

const Container = styled.div`
  font-style: italic;
`;

const index: NextPage = () => <Container>Hello Typescript!</Container>;

export default index;
