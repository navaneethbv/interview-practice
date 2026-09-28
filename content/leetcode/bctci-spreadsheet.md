# Spreadsheet

Implement `Spreadsheet(rows, cols)`, a grid of integers that starts at 0 everywhere.

- `set(row, col, value)` stores a value.
- `get(row, col)` returns the stored value.
- `sort_columns_by_row(row)` reorders whole columns so that the given row is in ascending order; the sort is stable.
- `sort_rows_by_column(col)` reorders whole rows so that the given column is in ascending order; the sort is stable.

Java method names are camelCase.
Construct one instance per test and run the operations in order; methods without a result produce null.

## Examples

### Example 1

```text
Input: ctor = [3, 3], ops = ["set", "set", "set", "set", "set", "sort_columns_by_row", "sort_rows_by_column", "get"], args = [[0, 0, 5], [0, 1, 3], [0, 2, 8], [1, 0, 6], [2, 1, 1], [0], [1], [1, 1]]
Output: [null, null, null, null, null, null, null, 5]
```

### Example 2

```text
Input: ctor = [3, 2], ops = ["sort_rows_by_column", "get"], args = [[0], [0, 0]]
Output: [null, 0]
```

## Constraints

- `1 <= rows, cols <= 100`
- `-10^9 <= value <= 10^9`
