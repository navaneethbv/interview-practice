# Rotate Image

Rotate a square matrix by 90 degrees clockwise in place.
Write the rotated entries into the original matrix, without allocating another n by n matrix.
Return nothing; the judge checks the matrix after your method finishes.

## Examples

### Example 1

```text
Input: matrix = [[1, 2], [3, 4]]
Output: [[3, 1], [4, 2]]
Explanation: The first column becomes the top row in reverse order.
```

### Example 2

```text
Input: matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
Output: [[7, 4, 1], [8, 5, 2], [9, 6, 3]]
Explanation: Each column moves to the corresponding row after the turn.
```

## Constraints

- The matrix is square with 1 <= n <= 20.
- -1000 <= matrix[row][column] <= 1000.
