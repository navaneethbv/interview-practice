# Minimum Cost Path With Teleportations

Start at the top-left cell with cost zero and reach the bottom-right cell.
Moving one cell right or down costs the value of the destination cell.
Up to k times, you may instead teleport to any cell whose value is no greater than the current cell's value, paying zero for that move.
Return the minimum total cost.

## Examples

### Example 1

```text
Input: grid = [[5, 1], [2, 3]], k = 1
Output: 0
Explanation: The destination value 3 is no greater than the starting value 5, so teleport directly.
```

### Example 2

```text
Input: grid = [[1, 2], [3, 4]], k = 0
Output: 6
Explanation: Without teleports, the cheaper route pays 2 then 4.
```

## Constraints

- 2 <= rows, columns <= 80.
- 0 <= grid[i][j] <= 10000.
- 0 <= k <= 10.
