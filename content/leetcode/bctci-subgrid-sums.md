# Subgrid Sums

Given an `R x C` grid, return a grid of the same size where cell `[r, c]` holds the sum of the subgrid whose top-left corner is `[r, c]` and whose bottom-right corner is `[R - 1, C - 1]`.

## Examples

### Example 1

```text
Input: grid = [[-1, 2, 3], [4, 0, 0], [-2, 0, 9]]
Output: [[15, 14, 12], [11, 9, 9], [7, 9, 9]]
```

### Example 2

```text
Input: grid = [[1, 2, 3]]
Output: [[6, 5, 3]]
```

## Constraints

- `1 <= R, C <= 1,000`
- `-10^3 <= grid[i][j] <= 10^3`
