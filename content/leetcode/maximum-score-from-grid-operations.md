# Maximum Score From Grid Operations

Initially every cell of the square grid is white.
For each column, you may color a prefix of its cells black, possibly choosing an empty prefix.
The score adds each white cell's value once if it has a black horizontal neighbor.
Return the maximum score over all choices.

## Examples

### Example 1

```text
Input: grid = [[1, 2], [3, 4]]
Output: 6
Explanation: Color the first column black; the two white cells in the second column score 2+4.
```

### Example 2

```text
Input: grid = [[9]]
Output: 0
Explanation: A single column has no horizontal neighbors.
```

## Constraints

- 1 <= grid.length == grid[i].length <= 100
- 0 <= grid[i][j] <= 1000000000
