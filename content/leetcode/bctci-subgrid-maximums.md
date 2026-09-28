# Subgrid Maximums

Given an `R x C` grid, return a grid of the same size where cell `[r, c]` holds the maximum of the subgrid whose top-left corner is `[r, c]` and whose bottom-right corner is `[R - 1, C - 1]`.

## Examples

### Example 1

```text
Input: grid = [[1, 5, 3], [4, -1, 0], [2, 0, 2]]
Output: [[5, 5, 3], [4, 2, 2], [2, 2, 2]]
```

### Example 2

```text
Input: grid = [[1, 2, 3]]
Output: [[3, 3, 3]]
```

## Constraints

- `1 <= R, C <= 1,000`
- `-10^4 <= grid[i][j] <= 10^4`
