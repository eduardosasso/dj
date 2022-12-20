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
    name: { type: "string", length: 4 },
    lastname: { type: "string", length: 3 },
    age: { type: "integer", length: 2 },
    active: { type: "boolean" },
    weight: { type: "float", length: 4 },
  };

  expect(result).toEqual(expected);
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
  console.log(result);

  expect(result.name).toBe("string");
  expect(result.lastname).toBe("string");
  expect(result.age).toBe("number");
  expect(result.address.street).toBe("string");
  expect(result.address.number).toBe("number");
});

test("array", () => {
  const data = {
    items: [1, 2, 3, 4, 5],
  };

  const json = JSON.stringify(data);
  const result = dj(json);

  console.log(result);

  expect(result.items).toBe("array");
});
