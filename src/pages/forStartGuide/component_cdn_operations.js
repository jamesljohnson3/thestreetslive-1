import React, { useMemo, useReducer } from "react";
import { Box } from "rebass";
import { BigImage } from "./big_image";
import { getHelper } from "./helpers";
import {
  preview,
  randomCrop,
  randomFilter,
  randomResize,
  upScale
} from "./operations";
import {
  Center,
  Link,
  LinkHighlighter,
  Poper,
  Url,
  UrlPart
} from "./styled_components";
import { vector } from "./vector";
import { CDN_BASE } from "./constants.js";

const serializeOperation = (operaion) => operaion.join("/");
const serialize = ({ uuid, operations }) =>
  [`${CDN_BASE}/${uuid}`, ...operations.map(serializeOperation)].join("/-/") +
  "/";

const Operations = ({ operations, children }) =>
  operations
    .map((operation) => children(operation))
    .reduce(
      (all, next) => (
        <>
          {all}
          /-/
          {next}
        </>
      ),
      <></>
    );

const hoverReducer = (state, [type, name]) => {
  switch (type) {
    case "add": {
      const newState = { ...state };

      newState[name] = true;

      return newState;
    }

    case "del": {
      const newState = { ...state };

      delete newState[name];

      return newState;
    }
  }
};

const bind = (name, dispatch) => ({
  onMouseEnter: () => dispatch(["add", name]),
  onMouseLeave: () => dispatch(["del", name])
});

const isActive = (state, name) =>
  state[name]
    ? {
        backgroundColor: "#e2e2e2"
      }
    : null;

const ImageUrl = ({ operations, uuid, setImage }) => {
  const [state, dispatch] = useReducer(hoverReducer, {});

  const isAnyActive = useMemo(() => {
    const values = Object.values(state);
    return values.length > 0 && values.every(Boolean);
  }, [state]);

  return (
    <>
      <Url>
        <Poper
          active={isActive(state, "cdn")}
          hover={<UrlPart {...bind("cdn", dispatch)}>ucarecdn.com</UrlPart>}
          body={getHelper("cdn")}
        />
        /
        <Poper
          active={isActive(state, "uuid")}
          hover={<UrlPart {...bind("uuid", dispatch)}>:uuid</UrlPart>}
          body={getHelper("uuid")}
        />
        <Operations operations={operations}>
          {([name]) => (
            <Poper
              active={isActive(state, name)}
              hover={<UrlPart {...bind(name, dispatch)}>:{name}</UrlPart>}
              body={getHelper(name)}
            />
          )}
        </Operations>
        /
      </Url>

      <Link
        href={serialize({ operations, uuid })}
        target="_blank"
        isAnyActive={isAnyActive}
      >
        <LinkHighlighter
          {...bind("cdn", dispatch)}
          active={isActive(state, "cdn")}
        >
          ucarecdn.com
        </LinkHighlighter>
        /
        <LinkHighlighter
          {...bind("uuid", dispatch)}
          active={isActive(state, "uuid")}
        >
          {uuid.slice(0, 4)}...{uuid.slice(uuid.length - 4, uuid.length)}
        </LinkHighlighter>
        <Operations operations={operations}>
          {(operation) => (
            <LinkHighlighter
              {...bind(operation[0], dispatch)}
              active={isActive(state, operation[0])}
            >
              {serializeOperation(operation)}
            </LinkHighlighter>
          )}
        </Operations>
        /
      </Link>
    </>
  );
};

// const shuffle = arr => arr.sort(() => Math.random() - 0.5)

const applyPreset = (image, preset) =>
  preset.reduce((image, operation) => {
    const { size = image.size, ast } = operation(image);

    return {
      ...image,
      size,
      src: [image.src, ast.join("/")].join("-/") + "/",
      operations: [...image.operations, ast]
    };
  }, image);

const presets = [
  [preview, randomFilter]
  // [randomCrop, randomResize],
  // [randomFilter]
];

const select = (arr, index) => arr[index % arr.length];

const shuffleReducer = (state) => {
  const data = applyPreset(state.imge, select(presets, state.count));

  return {
    ...state,
    count: state.count + 1,
    operations: data.operations,
    src: data.src
  };
};

const initState = (initial) => (state) => {
  const newState = {
    ...state,
    count: 0,
    imge: {
      size: vector(initial.width, initial.height),
      src: initial.src,
      uuid: initial.uuid,
      operations: []
    }
  };

  return shuffleReducer(newState);
};

export const CdnOperations = (initial) => {
  const [image, shuffle] = useReducer(
    shuffleReducer,
    initial,
    initState(initial)
  );

  return (
    <Box>
      <ImageUrl {...image} />

      <Box mt={30} mb={50}>
        <button
          onClick={() => {
            shuffle();
          }}
        >
          Randomize operations
        </button>
      </Box>

      <Center>
        <BigImage
          src={`${image.src}-/format/auto/`}
          srcSet={`${image.src}-/format/auto/-/quality/lightest/ 2x`}
        />
      </Center>
    </Box>
  );
};
