import frmBts from "pretty-bytes";
import React, { Suspense, useMemo } from "react";
import { Box, Flex } from "rebass";
import { BigImage } from "./big_image";
import { useDataFrom } from "./data_from";
import {
  Circle,
  InfoBlock,
  InfoList,
  ItemLabel,
  RecognizedObject
} from "./styled_components";
import { CDN_BASE } from "./constants.js";

export const Info = ({ format, width, height, size, uuid, setImage }) => {
  const bytes = useMemo(() => frmBts(size), [size]);
  return (
    <Flex flexDirection={["column", "row"]}>
      <Box
        width={["100%", 320]}
        height={["100%", 320]}
        css="height: 320px; flex: 0 1 320px;"
      >
        <BigImage
          src={`${CDN_BASE}/${uuid}/-/scale_crop/320x320/center/-/format/auto/`}
          srcSet={`${CDN_BASE}/${uuid}/-/scale_crop/640x640/center/-/format/auto/-/quality/lightest/ 2x`}
          alt="example"
        />
      </Box>
      <Flex mt={[4, 0]} ml={[0, 40]} justify="center">
        <InfoBlock>
          <InfoList>
            <li>
              <ItemLabel>format:</ItemLabel> {format}
            </li>
            <li>
              <ItemLabel>dimensions:</ItemLabel> {width} x {height} px
            </li>
            <li>
              <ItemLabel>objects:</ItemLabel>{" "}
              <Suspense fallback="...">
                <Recognition uuid={uuid} />
              </Suspense>
            </li>
            <li>
              <ItemLabel>human detection:</ItemLabel>{" "}
              <Suspense fallback="...">
                <Faces uuid={uuid} />
              </Suspense>
            </li>
            <li>
              <ItemLabel>colors:</ItemLabel>{" "}
              <Suspense fallback="...">
                <Colors uuid={uuid} />
              </Suspense>
            </li>
            <li>
              <ItemLabel>size:</ItemLabel> {bytes}
            </li>
            <li>
              <ItemLabel>uuid:</ItemLabel> {uuid}
            </li>
          </InfoList>
        </InfoBlock>
      </Flex>
    </Flex>
  );
};

const Faces = ({ uuid }) => {
  const data = useDataFrom(`${CDN_BASE}/${uuid}/detect_faces/`);
  return data.faces.length || 0;
};

const Colors = ({ uuid }) => {
  const data = useDataFrom(`${CDN_BASE}/${uuid}/-/preview/-/main_colors/`);
  return (data.main_colors || []).map(([r, g, b], index) => (
    <Circle color={`rgb(${r},${g},${b})`} key={index} />
  ));
};

const Recognition = ({ uuid }) => {
  const data = useDataFrom(
    `/.netlify/functions/object_recognition?uuid=${uuid}`
  );
  const { recognitionInfo } = data;

  if (!recognitionInfo) {
    return "Service unavailable";
  }

  return (
    <Flex flexDirection={["column", "row"]} display="inline-flex">
      {recognitionInfo.map((object, idx) => (
        <div key={idx}>
          <RecognizedObject>{object.toLowerCase()}</RecognizedObject>
          {idx < recognitionInfo.length - 1 ? "," : ""}
        </div>
      ))}
    </Flex>
  );
};
