## NAME

**dj** - Describe a JSON document structure

## SYNOPSIS

```bash
cat file.json | dj
```

## DESCRIPTION

The `dj` utility takes a JSON file as input and displays its structure similar to SQL’s `DESCRIBE <table>` statement.

It shows top-level as well nested elements along with data types, max length, counts, and more that can be used to quickly get an overview of the structure of a JSON document, and it is particularly helpful when dealing with large or complex files.

## EXAMPLES

```bash
echo '{"name": "Joe", "age": 20, "active": true}' | dj

{
  "name": {
    "_type": "string",
    "_maxLength": 3
  },
  "age": {
    "_type": "integer",
    "_maxLength": 2
  },
  "active": {
    "_type": "boolean"
  }
}
```

```bash
echo '{"sports": ["surf", "running", "biking", "skateboarding"]}' | dj

{
  "sports": [
    {
      "_type": "array",
      "_count": 4,
      "_structure": [
        {
          "_type": "string",
          "_maxLength": 13
        }
      ]
    }
  ]
}
```

```bash
 echo '{"details": {"price": 39.99, "ratings": [3, 5, 2]}}' | dj

{
  "title": {
    "_type": "string",
    "_maxLength": 11
  },
  "details": {
    "_type": "object",
    "_structure": {
      "count": {
        "_type": "integer",
        "_maxLength": 2
      },
      "price": {
        "_type": "float",
        "_maxLength": 5
      },
      "available": {
        "_type": "boolean"
      },
      "ratings": [
        {
          "_type": "array",
          "_count": 3,
          "_structure": [
            {
              "_type": "integer",
              "_maxLength": 1
            }
          ]
        }
      ]
    }
  }
}
```
