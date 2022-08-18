import util from "util";

export const dj = (json) => {
  const x = JSON.parse(json); // console.log(json);
  console.log(util.inspect(x, { colors: true }));
};
