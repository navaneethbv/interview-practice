# Maximum Non Negative Product in a Matrix

Move from the top-left to the bottom-right using only right or down steps and multiply all visited values.
Return the greatest nonnegative path product modulo 1,000,000,007.
If every path product is negative, return -1; apply the modulus only after choosing the maximum.

## Examples

### Example 1

```text
Input: grid = [[1, -2, 1], [1, -2, 1], [3, -4, 1]]
Output: 8
Explanation: A path using both -2 values can obtain a product of 8.
```

### Example 2

```text
Input: grid = [[1, 0], [-1, 2]]
Output: 0
Explanation: The zero-containing path beats the negative path.
```

## Constraints

- 1 <= grid.length, grid[i].length <= 15
- The grid is rectangular; -4 <= grid[i][j] <= 4.
