# Largest Local Values in a Matrix

`grid` is an `n x n` matrix. Return the `(n - 2) x (n - 2)` matrix whose entry `[i][j]` is the largest value in the 3 x 3 block of `grid` whose top-left corner is `[i][j]`.

## Constraints

- 3 <= n <= 100
- 1 <= grid[i][j] <= 100

## Examples

### Example 1

```text
Input: grid = [[9, 9, 8, 1], [5, 6, 2, 6], [8, 2, 6, 4], [6, 2, 2, 2]]
Output: [[9, 9], [8, 6]]
Explanation: Each 3 x 3 block contributes its maximum.
```

### Example 2

```text
Input: grid = [[1, 1, 1], [1, 2, 1], [1, 1, 1]]
Output: [[2]]
Explanation: A 3 x 3 grid has one block.
```
