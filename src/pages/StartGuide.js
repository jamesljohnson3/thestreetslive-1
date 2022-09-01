import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Box } from "rebass";
import { Flex } from "reflexbox";
import {
  H2,
  Paragraph,
  Step1,
  Step2,
  Step3
} from "./forStartGuide/index.js";

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e3e3e3;
  opacity: 0.5;
`;

const StepContainer = ({ active, ...props }) => (
  <Flex
    py={active ? 60 : 12}
    maxWidth={980}
    width="100%"
    flexDirection="column"
    {...props}
  />
);

export default () => {
  const [image, setImage] = useState();
  const [fileSelected, setFileSelected] = useState(false);

  useEffect(() => {
    console.log("image", image);
  });

  return (
    <Flex alignItems="center" flexDirection="column" px={12} pb={[5, 0]}>
      <StepContainer active>
        <Step1
          image={image}
          fileSelected={fileSelected}
          onFileSelect={(file) => {
            setFileSelected(Boolean(file));
          }}
          onUpload={(file) => {
            setImage({
              name: file.name,
              src: file.cdnUrl,
              uuid: file.uuid,
              operations: [],
              width: file.originalImageInfo.width,
              height: file.originalImageInfo.height,
              size: file.size,
              format: file.originalImageInfo.format
            });
          }}
          onReset={() => {
            setFileSelected(false);
            setImage(null);
          }}
        />
      </StepContainer>
      <HorizontalLine />
      <StepContainer active={Boolean(image)}>
        <Step2 image={image} />
      </StepContainer>
      <HorizontalLine />
      <StepContainer active={Boolean(image)}>
        <Step3 image={image} />
      </StepContainer>
      <HorizontalLine />
      {image && (
        <StepContainer active={Boolean(image)}>
          <Box pb={[0, 5]}>
            <Box mb={20}>
              <H2>Ready to get started?</H2>
            </Box>
            <Paragraph>
              Integrating Uploadcare into your app is easy. <br />
              It usually takes less than 3 minutes.
            </Paragraph>
            <Flex>
              <a href="/accounts/signup/">Start Free Trial</a>
            </Flex>
          </Box>
        </StepContainer>
      )}
    </Flex>
  );
};
