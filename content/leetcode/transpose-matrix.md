# Transpose Matrix

Return the transpose of `matrix`, exchanging rows and columns so output[c][r] equals input[r][c].

## Examples

### Example 1

```text
Input: matrix = [[1, 2, 3], [4, 5, 6]]
Output: [[1, 4], [2, 5], [3, 6]]
Explanation: Each original column becomes an output row.
```

### Example 2

```text
Input: matrix = [[7]]
Output: [[7]]
Explanation: A one-cell matrix is unchanged.
```

## Constraints

- 1 <= matrix.length, matrix[i].length <= 1,000
- The rectangular matrix has at most 100,000 entries.
- Entries fit signed 32-bit integers.
