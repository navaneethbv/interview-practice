# Shortest Path in a Grid with Obstacles Elimination

Move through shared edges from the top-left to the bottom-right cell.
Cells marked 1 are obstacles; entering one consumes an elimination, and you may use at most k eliminations.
Return the fewest moves, or -1 if no route is possible.

## Examples

### Example 1

```text
Input: grid = [[0, 0, 0], [1, 1, 0], [0, 0, 0], [0, 1, 1], [0, 0, 0]], k = 1
Output: 6
Explanation: One elimination allows a six-move route.
```

### Example 2

```text
Input: grid = [[0, 1, 1], [1, 1, 1], [1, 0, 0]], k = 1
Output: -1
Explanation: Every route requires more than one elimination.
```

## Constraints

- 1 <= grid.length, grid[i].length <= 40
- The grid is rectangular and binary; both endpoints contain 0.
- 0 <= k <= grid.length * grid[i].length
