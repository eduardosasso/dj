#!/usr/bin/env node

import { dj } from "./dj.js";

process.stdin.resume();
process.stdin.setEncoding("utf8");
process.stdin.on("data", function (data) {
  // process.stdout.write(data);
  dj(data);
});
