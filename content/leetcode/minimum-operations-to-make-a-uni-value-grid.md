# Minimum Operations to Make a Uni-Value Grid

An operation adds x to one grid cell or subtracts x from it.
Return the fewest operations needed to make all cells equal, or -1 if this is impossible.

## Examples

### Example 1

```text
Input: grid = [[2, 4], [6, 8]], x = 2
Output: 4
Explanation: Make every value 4 using 1, 0, 1, and 2 operations.
```

### Example 2

```text
Input: grid = [[1, 2]], x = 2
Output: -1
Explanation: The two cells have different remainders modulo 2.
```

## Constraints

- 1 <= grid.length * grid[0].length <= 100000
- 1 <= grid[i][j], x <= 10000
