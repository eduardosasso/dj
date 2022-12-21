import { expect, test } from "vitest";
import { dj } from "../dj.js";

test("primitive types", () => {
  const data = {
    name: "John",
    lastname: "Doe",
    age: 30,
    active: true,
    weight: 80.5,
  };

  const json = JSON.stringify(data);
  const result = dj(json);

  const expected = {
    name: { type: "string", maxLength: 4 },
    lastname: { type: "string", maxLength: 3 },
    age: { type: "integer", maxLength: 2 },
    active: { type: "boolean" },
    weight: { type: "float", maxLength: 4 },
  };

  expect(result).toEqual(expected);
});

test("array", () => {
  const data = {
    items: [1, 2, 3, 4, 532, 12.44, "hello world"],
  };

  const json = JSON.stringify(data);
  const result = dj(json);

  const expected = [
    {
      type: "array",
      count: 7,
      structure: [
        { type: "integer", maxLength: 3, count: 5 },
        { type: "float", maxLength: 5, count: 1 },
        { type: "string", maxLength: 11, count: 1 },
      ],
    },
  ];

  expect(result.items).toEqual(expected);
});

test("object type", () => {
  const data = {
    name: "John",
    lastname: "Doe",
    age: 30,
    active: true,
    address: {
      street: "Main Street",
      number: 123,
    },
  };

  const json = JSON.stringify(data);
  const result = dj(json);

  const expected = {
    name: {
      type: "string",
      maxLength: 4,
    },
    lastname: {
      type: "string",
      maxLength: 3,
    },
    age: {
      type: "integer",
      maxLength: 2,
    },
    active: {
      type: "boolean",
    },
    address: {
      type: "object",
      structure: {
        street: {
          type: "string",
          maxLength: 11,
        },
        number: {
          type: "integer",
          maxLength: 3,
        },
      },
    },
  };

  expect(result).toEqual(expected);
});
