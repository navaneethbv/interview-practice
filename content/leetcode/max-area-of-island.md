# Max Area of Island

In a binary grid, 1 represents land and 0 represents water.
An island connects land cells through shared edges, never diagonally.
Return the largest island area, measured in cells, or 0 if there is no land.

## Examples

### Example 1

```text
Input: grid = [[1, 0, 1], [1, 1, 0]]
Output: 3
Explanation: The left island contains three connected cells.
```

### Example 2

```text
Input: grid = [[0, 0], [0, 0]]
Output: 0
Explanation: There is no land.
```

## Constraints

- 1 <= grid.length, grid[i].length <= 50
- The grid is rectangular and contains only 0 and 1.
