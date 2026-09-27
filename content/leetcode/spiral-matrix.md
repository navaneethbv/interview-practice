# Spiral Matrix

Read every entry of a rectangular matrix in clockwise spiral order.
Begin at the top-left corner, move across the top row, then continue down the right edge, across the bottom, and up the left edge.
Repeat inward until every cell has been visited once.

## Examples

### Example 1

```text
Input: matrix = [[1, 2, 3], [4, 5, 6]]
Output: [1, 2, 3, 6, 5, 4]
Explanation: The outer boundary contains every cell.
```

### Example 2

```text
Input: matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
Output: [1, 2, 3, 6, 9, 8, 7, 4, 5]
Explanation: After the outer ring, visit the center.
```

## Constraints

- 1 <= number of rows, number of columns <= 10.
- -100 <= matrix[row][column] <= 100.
