import React from "react";
import styled from "styled-components";
import { Box, Text } from "rebass";

export const H2 = (props) => (
  <Text
    as="h2"
    letterSpacing="0.004px"
    fontSize="28px"
    lineHeight="41px"
    fontWeight="400"
    {...props}
  />
);

export const Paragraph = (props) => (
  <Box mb={40} maxWidth={750}>
    <Text
      as="p"
      letterSpacing="0.004px"
      fontSize="20px"
      lineHeight="32px"
      color="#626262"
      fontWeight="400"
      {...props}
    />
  </Box>
);

export const Card = styled.div`
  background-color: #f9f9f9;
  border-radius: 15px;
  width: 100%;
`;
