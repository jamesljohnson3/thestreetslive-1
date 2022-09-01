import React from "react";
import { Box, Flex } from "rebass";
import { CdnOperations } from "./component_cdn_operations";
import { H2, Paragraph } from "./shared";

export const Step3 = ({ image }) => {
  const isActive = Boolean(image);

  if (!isActive) {
    return <H2 color="#B5B5B5">Step 3. Deliver</H2>;
  }

  return (
    <Flex flexDirection="column">
      <Box mb={20}>
        <H2>Step 3. Deliver</H2>
      </Box>
      <Paragraph>
        Once a file is uploaded, it instantly becomes available on Uploadcare
        Bi-Directional CDN©. Simple URL operations allow you to resize, crop,
        and apply image filters on-the-fly. Try some now:
      </Paragraph>
      <CdnOperations {...image} />
    </Flex>
  );
};
