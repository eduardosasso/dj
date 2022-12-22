#!/usr/bin/env node

import { dj } from "./dj.js";
import { highlight } from "cli-highlight";

process.stdin.resume();
process.stdin.setEncoding("utf8");
process.stdin.on("data", (data) => {
  const result = dj(data);

  console.log(highlight(JSON.stringify(result, null, 2), { language: "json" }));
});
