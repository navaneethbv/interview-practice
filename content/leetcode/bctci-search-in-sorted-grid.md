# Search In Sorted Grid

Each row of `grid` is sorted in increasing order, and the last value of each row is smaller than the first value of the next row.
Return `[row, column]` of `target`, or `[-1, -1]` if it is absent.

## Examples

### Example 1

```text
Input: grid = [[1, 2, 4, 5], [6, 7, 8, 9]], target = 4
Output: [0, 2]
```

### Example 2

```text
Input: grid = [[1, 2, 4, 5], [6, 7, 8, 9]], target = 3
Output: [-1, -1]
```

## Constraints

- `1 <= rows, columns <= 10,000`
- `-10^4 <= grid[i][j], target <= 10^4`
