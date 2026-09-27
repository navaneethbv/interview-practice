# Set Matrix Zeroes

For every cell that is initially zero, set its entire row and column to zero.
Perform the changes in place, and do not let newly written zeros trigger additional rows or columns.
Return nothing; the judge reads the modified matrix.
Aim for constant additional space.

## Examples

### Example 1

```text
Input: matrix = [[1, 2, 3], [4, 0, 6]]
Output: [[1, 0, 3], [0, 0, 0]]
Explanation: The original zero clears row 1 and column 1.
```

### Example 2

```text
Input: matrix = [[1, 2], [3, 4]]
Output: [[1, 2], [3, 4]]
Explanation: No original cell is zero.
```

## Constraints

- 1 <= number of rows, number of columns <= 200.
- Every entry is a signed 32-bit integer.
