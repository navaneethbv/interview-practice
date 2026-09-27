# Largest Magic Square

Find the largest square submatrix whose row sums, column sums, and two diagonal sums are all equal.
Return its side length.
Values need not be distinct, and every one-cell square qualifies.

## Examples

### Example 1

```text
Input: grid = [[8, 1, 6], [3, 5, 7], [4, 9, 2]]
Output: 3
Explanation: Every required sum in this square is 15.
```

### Example 2

```text
Input: grid = [[1, 2], [3, 4]]
Output: 1
Explanation: No two-by-two magic square exists.
```

## Constraints

- 1 <= grid.length, grid[i].length <= 50
- The grid is rectangular; 1 <= grid[i][j] <= 10^6.
