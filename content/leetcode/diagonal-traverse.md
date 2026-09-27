# Diagonal Traverse

Read a rectangular matrix by diagonals whose cells share the same row-plus-column index.
Start at the top-left cell and alternate upward-right and downward-left traversal on successive diagonals.
Return the visited values.

## Examples

### Example 1

```text
Input: mat = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
Output: [1, 2, 4, 7, 5, 3, 6, 8, 9]
Explanation: Successive diagonals alternate direction.
```

### Example 2

```text
Input: mat = [[1, 2], [3, 4]]
Output: [1, 2, 3, 4]
Explanation: The middle diagonal visits 2 before 3.
```

## Constraints

- 1 <= mat.length, mat[i].length <= 10,000
- The matrix is rectangular and contains at most 10,000 cells.
- -100,000 <= mat[i][j] <= 100,000
