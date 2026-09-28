# Robot in a Grid

A robot starts at the top-left cell of an `r x c` grid and must reach the bottom-right cell.
It can only move right or down, and it cannot enter cells marked `1`; cells marked `0` are free.

Return the path as a list of `[row, column]` cells from start to finish, inclusive.
When several paths exist, return the one that moves right whenever a right move can still reach the target.
Return an empty list when no path exists, including when the start or target is blocked.

## Examples

### Example 1

```text
Input: grid = [[0, 0, 1], [1, 0, 0], [1, 1, 0]]
Output: [[0, 0], [0, 1], [1, 1], [1, 2], [2, 2]]
```

### Example 2

```text
Input: grid = [[0, 1], [1, 0]]
Output: []
```

## Constraints

- `1 <= r, c <= 100`
- `grid[i][j]` is `0` or `1`.
