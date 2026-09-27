# Maximum Rows Covered by Columns

Choose exactly numSelect columns of a binary matrix.
A row is covered when every 1 in that row lies in a selected column; all-zero rows are always covered.
Return the largest number of covered rows.

## Constraints

- The matrix has 1 to 12 rows and columns.
- `1 <= numSelect <= number of columns`.

## Examples

### Example 1

```text
Input: matrix = [[1, 0], [0, 1], [0, 0]], numSelect = 1
Output: 2
Explanation: Either selected column covers its single-1 row and the all-zero row.
```

### Example 2

```text
Input: matrix = [[1, 1], [1, 0]], numSelect = 2
Output: 2
Explanation: Selecting all columns covers every row.
```
