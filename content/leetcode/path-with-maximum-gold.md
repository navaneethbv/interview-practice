# Path with Maximum Gold

Start at any positive cell and collect its gold while moving between edge-adjacent positive cells.
You may not visit a cell twice, and you may stop anywhere.
Return the largest collectible total.

## Examples

### Example 1

```text
Input: grid = [[0, 6, 0], [5, 8, 7], [0, 9, 0]]
Output: 24
Explanation: The path 7, 8, 9 collects 24.
```

### Example 2

```text
Input: grid = [[1, 2, 3]]
Output: 6
Explanation: Traverse the entire positive row.
```

## Constraints

- 1 <= grid.length, grid[i].length <= 15
- The grid is rectangular; 0 <= grid[i][j] <= 100.
- At most 25 cells contain gold.
