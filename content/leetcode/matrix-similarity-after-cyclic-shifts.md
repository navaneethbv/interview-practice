# Matrix Similarity After Cyclic Shifts

Cyclically shift every even-indexed row left by k positions and every odd-indexed row right by k positions.
Return whether the resulting matrix equals the original.

## Examples

### Example 1

```text
Input: mat = [[1, 2, 1, 2], [3, 4, 3, 4]], k = 2
Output: true
Explanation: Each row repeats every two positions.
```

### Example 2

```text
Input: mat = [[1, 2, 3]], k = 1
Output: false
Explanation: A one-position shift changes the row.
```

## Constraints

- 1 <= mat.length, mat[i].length <= 25
- The matrix is rectangular; 1 <= mat[i][j] <= 25.
- 1 <= k <= 50
