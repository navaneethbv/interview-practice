# Longest Increasing Path in a Matrix

Choose any cell and walk to edge-adjacent cells with strictly larger values.
Return the greatest number of cells in such a path.
Diagonal moves and wrapping around an edge are not allowed.

## Examples

### Example 1

```text
Input: matrix = [[1, 2], [4, 3]]
Output: 4
Explanation: Follow 1, 2, 3, 4 around the square.
```

### Example 2

```text
Input: matrix = [[7, 7], [7, 7]]
Output: 1
Explanation: Equal values cannot extend the path.
```

## Constraints

- 1 <= matrix.length, matrix[i].length <= 200
- The matrix is rectangular.
- 0 <= matrix[i][j] <= 2^31 - 1
