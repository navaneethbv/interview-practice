# Shortest Path in Binary Matrix

Find the shortest path from the top-left to the bottom-right cell of a square binary grid, visiting only 0 cells.
Moves may use any of eight neighboring directions.
Return the number of cells in the path, including both endpoints, or -1 if no path exists.

## Examples

### Example 1

```text
Input: grid = [[0, 1], [1, 0]]
Output: 2
Explanation: One diagonal move visits two cells.
```

### Example 2

```text
Input: grid = [[1, 0], [0, 0]]
Output: -1
Explanation: The starting cell is blocked.
```

## Constraints

- 1 <= grid.length == grid[i].length <= 100
- Each cell is 0 or 1.
