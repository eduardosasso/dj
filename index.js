#!/usr/bin/env node

import { dj } from "./dj.js";

process.stdin.resume();
process.stdin.setEncoding("utf8");
process.stdin.on("data", (data) => {
  const result = dj(data);

  console.log(result);
});
