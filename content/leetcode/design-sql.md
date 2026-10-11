# Design SQL

Implement a tiny in-memory database. Table `names[i]` has `columns[i]` columns.
`insertRow(name, row)` adds a row to the table and gives it the next id: ids start at 1 for each table and are never reused, even after deletion.
`deleteRow(name, rowId)` removes a row.
`selectCell(name, rowId, columnId)` returns the value in that row's column (columns are numbered from 1).

Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- Every operation refers to an existing table.
- deleteRow and selectCell refer to rows that currently exist.
- Rows have exactly the table's number of columns.

## Examples

### Example 1

```text
Input: ctor = [["one", "two", "three"], [2, 3, 1]], ops = ["insertRow", "selectCell", "insertRow", "deleteRow", "selectCell"], args = [["two", ["first", "second", "third"]], ["two", 1, 3], ["two", ["fourth", "fifth", "sixth"]], ["two", 1], ["two", 2, 2]]
Output: [null, "third", null, null, "fifth"]
Explanation: The second row gets id 2 and keeps it after row 1 is deleted.
```

### Example 2

```text
Input: ctor = [["t"], [1]], ops = ["insertRow", "deleteRow", "insertRow", "selectCell"], args = [["t", ["a"]], ["t", 1], ["t", ["b"]], ["t", 2, 1]]
Output: [null, null, null, "b"]
Explanation: Deleted ids are not reused.
```
