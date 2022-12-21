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
    name: { _type: "string", _maxLength: 4 },
    lastname: { _type: "string", _maxLength: 3 },
    age: { _type: "integer", _maxLength: 2 },
    active: { _type: "boolean" },
    weight: { _type: "float", _maxLength: 4 },
  };

  // console.log(JSON.stringify(result, null, 2));

  expect(result).toEqual(expected);
});

test("array", () => {
  const data = {
    items: [1, 2, 3, 4, 532, 12.44, null, "hello world", null],
  };

  const json = JSON.stringify(data);
  const result = dj(json);

  // console.log(JSON.stringify(result, null, 2));

  const expected = {
    items: [
      {
        _type: "array",
        _count: 9,
        _structure: [
          {
            _type: "integer",
            _maxLength: 3,
            _count: 5,
          },
          {
            _type: "float",
            _maxLength: 5,
            _count: 1,
          },
          {
            _type: "null",
            _count: 2,
          },
          {
            _type: "string",
            _maxLength: 11,
            _count: 1,
          },
        ],
      },
    ],
  };

  expect(result).toEqual(expected);
});

test("array with object", () => {
  const data = {
    results: {
      items: [
        {
          name: "Adam",
          lastname: "Driver",
          age: 20,
          active: true,
          weight: 61,
          date: "2021-01-01",
        },
        {
          name: "John",
          lastname: "Doe",
          age: 30,
          active: true,
          weight: 80.5,
          date: "2021-01-01",
        },
      ],
    },
  };

  const json = JSON.stringify(data);
  const result = dj(json);

  // console.log(JSON.stringify(result, null, 2));

  const expected = {
    results: {
      _type: "object",
      _structure: {
        items: [
          {
            _type: "array",
            _count: 2,
            _structure: [
              {
                _type: "object",
                _structure: {
                  name: {
                    _type: "string",
                    _maxLength: 4,
                  },
                  lastname: {
                    _type: "string",
                    _maxLength: 6,
                  },
                  age: {
                    _type: "integer",
                    _maxLength: 2,
                  },
                  active: {
                    _type: "boolean",
                  },
                  weight: {
                    _type: "integer",
                    _maxLength: 2,
                  },
                  date: {
                    _type: "string",
                    _maxLength: 10,
                  },
                },
              },
            ],
          },
        ],
      },
    },
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

  const expected = {
    name: {
      _type: "string",
      _maxLength: 4,
    },
    lastname: {
      _type: "string",
      _maxLength: 3,
    },
    age: {
      _type: "integer",
      _maxLength: 2,
    },
    active: {
      _type: "boolean",
    },
    address: {
      _type: "object",
      _structure: {
        street: {
          _type: "string",
          _maxLength: 11,
        },
        number: {
          _type: "integer",
          _maxLength: 3,
        },
      },
    },
  };

  expect(result).toEqual(expected);
});

test("null or undefined", () => {
  const data = {
    name: "Sara",
    lastname: null,
  };

  const json = JSON.stringify(data);
  const result = dj(json);

  const expected = {
    name: {
      _type: "string",
      _maxLength: 4,
    },
    lastname: {
      _type: "null",
    },
  };

  expect(result).toEqual(expected);
});
