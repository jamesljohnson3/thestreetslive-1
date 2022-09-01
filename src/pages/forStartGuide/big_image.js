import React, { useEffect, useRef, useState } from "react";
import { Flex, Position, Text } from "rebass";
import { BigImage as StyledBigImage } from "./styled_components";

const TIMEOUT = 3000;

export const BigImage = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const timeout = useRef();

  useEffect(() => {
    setLoaded(false);
    setShowLoader(false);
  }, [props.src, props.srcSet]);

  useEffect(() => {
    timeout.current = setTimeout(() => setShowLoader(true), TIMEOUT);

    return () => {
      if (timeout.current) {
        timeout.current = clearTimeout(timeout.current);
      }
    };
  }, [loaded]);

  return (
    <Flex justifyContent="center" alignItems="center" height="100%">
      {showLoader && !loaded && (
        <Position position="absolute">
          <Text fontSize="20px" lineHeight="22px">
            Loading...
          </Text>
        </Position>
      )}
      <StyledBigImage
        {...props}
        isLoading={!loaded}
        onLoad={() => setLoaded(true)}
        onLoadStart={() => setLoaded(false)}
      />
    </Flex>
  );
};
