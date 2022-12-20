import _ from "lodash-es";

export const dj = (json) => {
  const data = JSON.parse(json);

  // TODO
  // if then next if function returns true
  // add metadata
  return describe(data);
};

const describe = (data) => {
  const structure = {};

  Object.keys(data).forEach((key) => {
    // formatString(data, key);
    formatNumber(data, key);
    formatObject(data, key);
    // formatArray(data, key);
  });

  return data;
};

const formatString = (data, key) => {
  if (!_.isString(data[key])) return;

  data[key] = "string";
};

const formatNumber = (data, key) => {
  if (!_.isNumber(data[key])) return;

  console.log("num", data[key]);
  data[key] = "number";
};

const formatObject = (data, key) => {
  if (!_.isObject(data[key])) return;

  data[key] = describe(data[key]);
};

const formatArray = (data, key) => {
  if (!_.isArray(data[key])) return;

  const structure = new Set();

  const items = _.cloneDeep(data[key]);
  console.log(items);

  items.forEach((item, index) => {
    // console.log(items, index);
    // console.log(describe(items, index));
    structure.add(describe(items, index));
  });

  data[key] = structure;
};
