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
    maxLength: value.length,
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
    maxLength: value.toString().length,
  };
};

const handleObject = (value) => {
  const root = {
    type: "object",
    structure: {},
  };

  Object.keys(value).forEach((key) => {
    const type = dataType(value[key]);
    root.structure[key] = HANDLER[type](value[key]);
  });

  return root;
};

const handleArray = (value) => {
  const root = {
    type: "array",
    count: value.length,
    structure: [],
  };

  const types = {};

  // loop over array items and organize them by type
  value.forEach((item) => {
    const type = dataType(item);
    types[type] = [...(types[type] || []), HANDLER[type](item)];
  });

  // loop over types and break in groups
  Object.keys(types).forEach((type) => {
    const groups = _.groupBy(types[type], "type");

    // loop over groups and take the one with the max length
    Object.keys(groups).forEach((group) => {
      const item = _.maxBy(groups[group], "maxLength");

      root.structure.push({ ...item, count: groups[group].length });
    });
  });

  return [root];
};

const HANDLER = {
  string: handleString,
  number: handleNumber,
  boolean: handleBoolean,
  object: handleObject,
  array: handleArray,
};
