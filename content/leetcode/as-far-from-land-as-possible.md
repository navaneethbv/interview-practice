# As Far from Land as Possible

In a square binary grid, land is 1 and water is 0.
For every water cell, measure its Manhattan distance to the nearest land cell.
Return the largest such distance, or -1 if the grid contains no land or no water.

## Examples

### Example 1

```text
Input: grid = [[1, 0, 1], [0, 0, 0], [1, 0, 1]]
Output: 2
Explanation: The center is two steps from its nearest land.
```

### Example 2

```text
Input: grid = [[1, 0, 0], [0, 0, 0], [0, 0, 0]]
Output: 4
Explanation: The bottom-right corner is four steps from the only land.
```

## Constraints

- 1 <= grid.length == grid[i].length <= 100
- Each cell is 0 or 1.
