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
echo '{"details": {"name": "Super", "price": 39.99, "ratings": [3, 5, 2]}}' | dj

{
  "details": {
    "_type": "object",
    "_structure": {
      "name": {
        "_type": "string",
        "_maxLength": 5
      },
      "price": {
        "_type": "float",
        "_maxLength": 5
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
