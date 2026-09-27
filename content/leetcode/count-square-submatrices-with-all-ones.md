# Count Square Submatrices with All Ones

Return the number of square submatrices containing only 1.
Count every position and every possible side length separately.

## Examples

### Example 1

```text
Input: matrix = [[1, 1], [1, 1]]
Output: 5
Explanation: Count four unit squares and the full two-by-two square.
```

### Example 2

```text
Input: matrix = [[1, 0], [0, 1]]
Output: 2
Explanation: Only the two unit squares qualify.
```

## Constraints

- 1 <= matrix.length, matrix[i].length <= 300
- The matrix is rectangular and binary.
