import _ from "lodash-es";

export const dj = (json) => {
  const data = JSON.parse(json);

  // TODO
  // if then next if function returns true
  // add metadata
  return describe(data);
};

const describe = (data) => {
  Object.keys(data).forEach((key) => {
    formatString(data, key);
    formatNumber(data, key);
    formatObject(data, key);
  });

  return data;
};

const formatString = (data, key) => {
  if (!_.isString(data[key])) return;

  data[key] = "string";
};

const formatNumber = (data, key) => {
  if (!_.isNumber(data[key])) return;

  data[key] = "number";
};

const formatObject = (data, key) => {
  if (!_.isObject(data[key])) return;

  data[key] = describe(data[key]);
};
