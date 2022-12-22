# NAME

**dj** - Describe a JSON document structure

# SYNOPSIS

```bash
cat file.json | dj
```

```bash
dj file.json
```

# DESCRIPTION

The `dj` utility takes a JSON file as input and displays its structure similar to SQL’s `DESCRIBE <table>` statement. It shows top-level as well nested elements along with data types, max length, counts, and more that can be used to quickly get an overview of the structure of a JSON document, and it is particularly helpful when dealing with large or complex files.
