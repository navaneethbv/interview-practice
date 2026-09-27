# Search a 2D Matrix II

Every row and every column of `matrix` is sorted in nondecreasing order.
Return whether `target` occurs anywhere in the matrix.

## Examples

### Example 1

```text
Input: matrix = [[1, 4, 7], [2, 5, 8], [3, 6, 9]], target = 6
Output: true
Explanation: The target is in the last row.
```

### Example 2

```text
Input: matrix = [[1, 4], [2, 5]], target = 3
Output: false
Explanation: No cell contains 3.
```

## Constraints

- 1 <= matrix.length, matrix[i].length <= 300
- The matrix is rectangular.
- -10^9 <= matrix[i][j], target <= 10^9
