import { expect, test } from "vitest";
import { dj } from "../dj.js";

test.skip("primitive types", () => {
  const data = {
    name: "John",
    lastname: "Doe",
    age: 30,
    active: true,
  };

  const json = JSON.stringify(data);
  const result = dj(json);

  expect(result.name).toBe("string");
  expect(result.lastname).toBe("string");
  expect(result.age).toBe("number");
});

test.skip("object type", () => {
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

  // console.log(result);

  expect(result.items).toBe("array");
});
