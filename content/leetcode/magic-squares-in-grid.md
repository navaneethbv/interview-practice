# Magic Squares in Grid

Count 3 by 3 subgrids containing each integer from 1 through 9 exactly once, with equal sums in all three rows, all three columns, and both diagonals.

## Examples

### Example 1

```text
Input: grid = [[4, 3, 8, 4], [9, 5, 1, 9], [2, 7, 6, 2]]
Output: 1
Explanation: Only the left 3 by 3 window meets every condition.
```

### Example 2

```text
Input: grid = [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
Output: 0
Explanation: Equal sums are insufficient because the digits must be distinct 1 through 9.
```

## Constraints

- 1 <= rows, columns <= 10.
- 0 <= grid[row][column] <= 15.
