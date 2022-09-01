import { Widget } from "@uploadcare/react-widget/en";
import parse from "color-parse";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Box, Grid, Position, Text } from "rebass";
import { Flex } from "reflexbox";
import { IconClose } from "./icons";
import { Card, H2, Paragraph } from "./shared";
import { CDN_BASE } from "./constants.js";

const DEFAULT_COLOR = "#FFFFFF";
const DEFAULT_BG = "#0E54FF";
const DEFAULT_TEXT = "Upload image";
const texts = {
  buttons: { choose: { images: { one: DEFAULT_TEXT } } }
};

const Global = styled.div`
  & .uploadcare--widget__button {
    color: ${DEFAULT_COLOR};
    color: var(--widget-color);

    background-color: ${DEFAULT_BG};
    background-color: var(--widget-bg-color);
  }
`;

const ColorPicker = styled.input`
  position: absolute;
  right: 10px;

  top: 50%;
  transform: translateY(-50%);

  appearance: none;
  border: none;
  outline: none;
  border-radius: 50%;
  display: block;

  width: 20px;
  height: 20px;

  padding: 0;
  background-color: transparent;
  box-sizing: border-box;
  cursor: pointer;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-moz-color-swatch {
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 50%;
  }

  &::-webkit-color-swatch {
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 50%;
  }

  &:focus {
    box-shadow: 0px 0px 0px 4px rgba(0, 0, 0, 0.3);
  }
`;

const InputText = styled.input`
  font-family: var(--font-mono);
  width: 100%;
  font-size: 16px;
  line-height: 22px;

  padding: 9px 15px;

  display: flex;
  align-items: center;
  letter-spacing: 0.004px;

  color: #444444;
  border: 1px solid #d1d1d1;
  border-radius: 4px;

  outline: none;
  appearance: none;
`;

const isDefined = (value) => value != null && Number.isFinite(value);

const InputColor = ({ value, setValue }) => {
  const [controlled, set] = useState(true);

  const cprops = {
    value: value,
    onChange: (e) => {
      controlled || set(true);
      setValue(e.target.value);
    }
  };

  const tprops = {
    value: controlled ? value : undefined,
    onChange: (e) => {
      controlled && set(false);
      const parsed = parse(e.target.value);

      if (parsed && parsed.values && parsed.values.every(isDefined)) {
        const result = parsed.values
          .map((value) => value.toString(16).padStart(2, "0"))
          .reduce((hex, color) => `${hex}${color}`, "#");

        if (result !== "#") {
          setValue(result);
        }
      }
    }
  };

  return (
    <Position position="relative">
      <InputText type="text" {...tprops} />
      <ColorPicker type="color" {...cprops} />
    </Position>
  );
};

const ImagePreset = styled.img`
  border-radius: 4px;
  cursor: grab;
`;

const PresetButton = styled.button`
  background: none;
  border: none;
  outline: none;
`;

const Label = (props) => (
  <Text
    fontSize={16}
    lineHeight="21px"
    letterSpacing="0.004px"
    color="#626262"
    {...props}
  />
);

const InputGroup = styled.div`
  display: grid;
  grid-gap: 5px;
`;

const UploadedFile = styled.div`
  background-color: #f9f9f9;
  border-radius: 4px;
  display: inline-flex;
  width: 100%;
`;

const CloseButton = styled(Box)`
  background: none;
  border: 0;
  cursor: pointer;
  color: #444444;
  outline: none;

  &:hover {
    color: #000000;
  }
`;

const useTouchSupport = () => {
  return useMemo(
    () =>
      typeof window !== "undefined" &&
      "ontouchstart" in document.documentElement,
    []
  );
};

export const Step1 = ({
  image,
  fileSelected,
  onUpload,
  onFileSelect,
  onReset
}) => {
  const touchSupport = useTouchSupport();
  const ref = useRef();
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [bg, setBg] = useState(DEFAULT_BG);
  const [text, setText] = useState(DEFAULT_TEXT);

  useEffect(() => {
    if (ref.current) {
      const button = ref.current.querySelector(
        ".uploadcare--widget__button.uploadcare--widget__button_type_open"
      );

      if (button) {
        button.innerText = text || DEFAULT_TEXT;
      }
    }
  });

  const onPresetSelect = (e) => {
    onUpload({
      name: "selin-sahin-5DB3cYe7Nxk-unsplash.jpg",
      cdnUrl: `${CDN_BASE}/d8e5c977-6627-46b7-b677-fe8f09ebce1d/`,
      uuid: "d8e5c977-6627-46b7-b677-fe8f09ebce1d",
      size: 2302340,
      originalImageInfo: {
        format: "JPEG",
        height: 3024,
        width: 3024
      }
    });
  };

  return (
    <Flex flexDirection="column">
      <Box mb={20}>
        <H2>Step 1. Upload image</H2>
      </Box>
      {image ? (
        <Paragraph>
          By default, all files are stored automatically on Uploadcare servers,
          and you receive unique file identifiers or UUIDs.
        </Paragraph>
      ) : (
        <Paragraph>
          Customize Uploader’s appearance to fit your app or site, and upload a
          file:
        </Paragraph>
      )}

      {image ? (
        <Box
          position="relative"
          css={css`
            display: inline-flex;
          `}
        >
          <Flex alignItems="center">
            <UploadedFile>
              <img
                width="40"
                height="40"
                src={`${image.src}-/scale_crop/80x80/center/-/format/auto/-/quality/lightest/`}
              />
              <Flex
                py="2px"
                pl="15px"
                pr="11px"
                alignItems="center"
                maxWidth="calc(100vw - 102px)"
              >
                <Text
                  fontFamily="var(--font-mono)"
                  fontSize={[16, 20]}
                  lineHeight={["24px", "36px"]}
                  letterSpacing="0.004px"
                  color="#444444"
                  css={css`
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  `}
                >
                  {image.name}
                </Text>
              </Flex>
            </UploadedFile>
            <CloseButton as="button" p={15} onClick={onReset}>
              <IconClose />
            </CloseButton>
          </Flex>
        </Box>
      ) : (
        <Card fullWidth>
          <Flex px={30} flexDirection={["column", "row"]}>
            <Flex
              py={30}
              flex="1"
              justifyContent="center"
              alignItems="center"
              flexDirection={["column", "row"]}
            >
              <Global
                ref={ref}
                style={{ "--widget-color": color, "--widget-bg-color": bg }}
              >
                <Widget
                  imagesOnly
                  doNotStore
                  publicKey="ea3f982043312a46a130"
                  locale="en"
                  localeTranslations={texts}
                  onChange={onUpload}
                  onFileSelect={onFileSelect}
                />
              </Global>

              {!fileSelected && (
                <>
                  <Box px={20} py={[3, 0]}>
                    <Label>or {touchSupport ? "pick" : "drag"} this one</Label>
                  </Box>
                  <PresetButton onClick={onPresetSelect}>
                    <ImagePreset
                      onClick={onPresetSelect}
                      onDragStart={(e) => {
                        e.dataTransfer.setData(
                          "text/uri-list",
                          `${CDN_BASE}/d8e5c977-6627-46b7-b677-fe8f09ebce1d/`
                        );
                      }}
                      width="48"
                      height="48"
                      src={`${CDN_BASE}/d8e5c977-6627-46b7-b677-fe8f09ebce1d/-/resize/96x96/-/format/auto/-/quality/lightest/`}
                    />
                  </PresetButton>
                </>
              )}
            </Flex>
            <Box
              borderLeft={["none", "1px solid #EAEAEA"]}
              borderTop={["1px solid #EAEAEA", "none"]}
            >
              <Box pl={[0, 30]} py={30}>
                <Box minWidth={["auto", 264]} gridGap={30}>
                  <InputGroup>
                    <Label>Button color</Label>
                    {/* <InputColor
                      value={bg}
                      setValue={(value) => {
                        setBg(value);
                      }}
                    /> */}
                  </InputGroup>

                  <InputGroup>
                    <Label>Font color</Label>
                    {/* <InputColor
                      value={color}
                      setValue={(value) => {
                        setColor(value);
                      }}
                    /> */}
                  </InputGroup>
                  <InputGroup>
                    <Label>Label</Label>
                    <InputText
                      type="text"
                      value={text}
                      onChange={(e) => {
                        setText(e.target.value);
                      }}
                    />
                  </InputGroup>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Card>
      )}
    </Flex>
  );
};
