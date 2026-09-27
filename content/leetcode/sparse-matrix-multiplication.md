# Sparse Matrix Multiplication

Return the matrix product mat1 multiplied by mat2.
If mat1 has m rows and k columns and mat2 has k rows and n columns, output an m by n matrix.
Each result entry is the sum of products along the corresponding row of mat1 and column of mat2.
Exploit zero entries when useful.

## Examples

```text
Input: mat1 = [[1,0,2]], mat2 = [[3],[4],[5]]
Output: [[13]]
Explanation: The dot product is 1*3 + 0*4 + 2*5.
```

```text
Input: mat1 = [[1,0],[0,1]], mat2 = [[2,3],[4,5]]
Output: [[2,3],[4,5]]
Explanation: Multiplying by the identity matrix preserves mat2.
```

## Constraints

- 1 <= m, k, n <= 100
- Every input entry is between -100 and 100.
- mat1 has as many columns as mat2 has rows.
