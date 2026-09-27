# Range Sum Query 2D - Immutable

Initialize with a fixed integer matrix.
`sumRegion(row1,col1,row2,col2)` returns the sum of the rectangle including both corners.
Support repeated queries efficiently without changing the matrix.

## Examples

### Example 1

```text
Input: constructor = [[[1, 2], [3, 4]]], operations = ["sumRegion", "sumRegion"], arguments = [[0, 0, 1, 1], [0, 1, 1, 1]]
Output: [10, 6]
Explanation: The whole matrix sums to 10; the right column sums to 6.
```

### Example 2

```text
Input: constructor = [[[-1]]], operations = ["sumRegion"], arguments = [[0, 0, 0, 0]]
Output: [-1]
Explanation: The requested rectangle is one cell.
```

## Constraints

- 1 <= matrix.length, matrix[i].length <= 200
- -100,000 <= matrix[i][j] <= 100,000
- Every query uses valid ordered corners.
- At most 10,000 sumRegion calls occur.
