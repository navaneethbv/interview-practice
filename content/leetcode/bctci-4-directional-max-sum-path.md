# 4-Directional Max-Sum Path

Return the largest sum of a path from the top-left cell to the bottom-right cell that moves up, down, left, or right and never visits a cell twice.
Values may be negative.

## Examples

### Example 1

```text
Input: grid = [[1, -4, 3], [-2, 7, -6], [5, -4, 9]]
Output: 12
```

### Example 2

```text
Input: grid = [[-5]]
Output: -5
```

## Constraints

- `1 <= rows, columns <= 5`
- `-100 <= grid[i][j] <= 100`
