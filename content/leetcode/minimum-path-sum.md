# Minimum Path Sum

Move from the top-left to the bottom-right cell using only steps right or down.
Return the smallest sum of all visited cell values, including both endpoints.

## Examples

### Example 1

```text
Input: grid = [[1, 3, 1], [1, 5, 1], [4, 2, 1]]
Output: 7
Explanation: A path across the top and then down totals 7.
```

### Example 2

```text
Input: grid = [[1, 2, 3]]
Output: 6
Explanation: Only the straight horizontal path is possible.
```

## Constraints

- 1 <= grid.length, grid[i].length <= 200
- The grid is rectangular; 0 <= grid[i][j] <= 200.
