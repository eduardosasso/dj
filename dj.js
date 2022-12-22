import _ from "lodash-es";

export const dj = (json) => {
  try {
    const data = JSON.parse(json);

    // TODO
    // handle invalid json
    return describe(data);
  } catch (error) {
    throw new Error("Invalid JSON");
  }
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

  if (value === null) return "null";
  if (Array.isArray(value)) return "array";

  return type;
};

const handleString = (value) => {
  return {
    _type: "string",
    _maxLength: value.length,
  };
};

const handleBoolean = (value) => {
  return {
    _type: "boolean",
  };
};

const handleNumber = (value) => {
  return {
    _type: Number.isInteger(value) ? "integer" : "float",
    _maxLength: value.toString().length,
  };
};

const handleObject = (value) => {
  const root = {
    _type: "object",
    _structure: {},
  };

  Object.keys(value).forEach((key) => {
    const type = dataType(value[key]);
    root._structure[key] = HANDLER[type](value[key]);
  });

  return root;
};

const handleNull = (value) => {
  return {
    _type: "null",
  };
};

const handleArray = (value) => {
  const root = {
    _type: "array",
    _count: value.length,
    _structure: [],
  };

  const types = {};

  // loop over array items and organize them by type
  value.forEach((item) => {
    const type = dataType(item);
    types[type] = [...(types[type] || []), HANDLER[type](item)];
  });

  // loop over types and break in groups
  Object.keys(types).forEach((type) => {
    const groups = _.groupBy(types[type], "_type");

    // loop over groups and take the one with the max length
    Object.keys(groups).forEach((group) => {
      const item = ["object", "null"].includes(type)
        ? groups[group][0]
        : _.maxBy(groups[group], "_maxLength");

      if (root["_count"] !== groups[group].length)
        item["_count"] = groups[group].length;

      root._structure.push(item);
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
  null: handleNull,
};
