import _ from "lodash-es";

export const dj = (json) => {
  const data = JSON.parse(json);

  // TODO
  // handle null, undefined
  return describe(data);
};

const describe = (data) => {
  const structure = {};
  Object.keys(data).forEach((key) => {
    const value = data[key];
    const type = dataType(value);

    structure[key] = HANDLER[type](value);
  });

  return structure;
};

const dataType = (value) => {
  const type = typeof value;

  return Array.isArray(value) ? "array" : type;
};

const handleString = (value) => {
  return {
    type: "string",
    length: value.length,
  };
};

const handleBoolean = (value) => {
  return {
    type: "boolean",
  };
};

const handleNumber = (value) => {
  return {
    type: Number.isInteger(value) ? "integer" : "float",
    length: value.toString().length,
  };
};

const handleObject = (value) => {};

const handleArray = (value) => {};

const HANDLER = {
  string: handleString,
  number: handleNumber,
  boolean: handleBoolean,
  object: handleObject,
  array: handleArray,
};
