# Max Sum of Rectangle No Larger Than K

Return the largest sum of a nonempty rectangular submatrix that does not exceed k.
At least one qualifying rectangle is guaranteed.

## Examples

### Example 1

```text
Input: matrix = [[1, 0, 1], [0, -2, 3]], k = 2
Output: 2
Explanation: The rectangle formed by the final two columns sums to 2.
```

### Example 2

```text
Input: matrix = [[2, 2, -1]], k = 3
Output: 3
Explanation: The full row totals 3.
```

## Constraints

- 1 <= matrix.length, matrix[i].length <= 100
- The matrix is rectangular; -100 <= matrix[i][j] <= 100.
- -100,000 <= k <= 100,000
