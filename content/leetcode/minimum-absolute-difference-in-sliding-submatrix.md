# Minimum Absolute Difference in Sliding Submatrix

For every k-by-k window, find the smallest absolute difference between two distinct numeric values in that window.
If it contains only one distinct value, use 0.
Return the results indexed by each window's top-left corner.

## Examples

### Example 1

```text
Input: grid = [[2, 2], [5, 9]], k = 2
Output: [[3]]
Explanation: Repeated 2s do not form a distinct-value pair; the closest values are 2 and 5.
```

### Example 2

```text
Input: grid = [[3, 7]], k = 1
Output: [[0, 0]]
Explanation: Every one-cell window has only one value.
```

## Constraints

- 1 <= grid.length, grid[0].length <= 30
- 1 <= k <= min(grid.length, grid[0].length)
- -100000 <= grid[i][j] <= 100000
