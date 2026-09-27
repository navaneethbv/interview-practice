# Largest Submatrix With Rearrangements

You may rearrange the columns of a binary matrix in any order, moving each whole column together.
Return the largest area of an all-1 rectangular submatrix obtainable.

## Examples

### Example 1

```text
Input: matrix = [[0, 0, 1], [1, 1, 1], [1, 0, 1]]
Output: 4
Explanation: Reorder columns to make a two-by-two all-1 rectangle.
```

### Example 2

```text
Input: matrix = [[1, 0, 1, 0, 1]]
Output: 3
Explanation: Place the three 1 columns next to each other.
```

## Constraints

- 1 <= matrix.length, matrix[i].length <= 100,000
- The matrix is rectangular and contains at most 100,000 cells.
- Each entry is 0 or 1.
