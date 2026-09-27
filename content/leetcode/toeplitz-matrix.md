# Toeplitz Matrix

Return whether every diagonal running from top-left to bottom-right contains only one repeated value.

## Examples

### Example 1

```text
Input: matrix = [[1, 2, 3], [4, 1, 2], [5, 4, 1]]
Output: true
Explanation: Each descending diagonal is constant.
```

### Example 2

```text
Input: matrix = [[1, 2], [2, 2]]
Output: false
Explanation: The main diagonal changes from 1 to 2.
```

## Constraints

- 1 <= matrix.length, matrix[i].length <= 20
- The matrix is rectangular; 0 <= matrix[i][j] <= 99.
