import React from "react";
import { Box, Flex } from "rebass";
import { Info } from "./info";
import { H2, Paragraph } from "./shared";

export const Step2 = ({ image }) => {
  const isActive = Boolean(image);

  if (!isActive) {
    return <H2 color="#B5B5B5">Step 2. Get insights</H2>;
  }

  return (
    <Flex flexDirection="column">
      <Box mb={20}>
        <H2>Step 2. Get insights</H2>
      </Box>
      <Paragraph>
        Our technology analyzes every uploaded file to give you unique insights
        into your assets. It helps search, filter, tag and moderate content.
      </Paragraph>
      <Info {...image} />
    </Flex>
  );
};
