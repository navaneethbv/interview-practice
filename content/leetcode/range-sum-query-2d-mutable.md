# Mutable Two-Dimensional Range Sums

Implement `NumMatrix(matrix)` for a grid that supports repeated updates and rectangle-sum queries.
`update(row,col,val)` replaces one entry with val.
`sumRegion(row1,col1,row2,col2)` returns the sum of the rectangle bounded by the two corners, including both boundaries.
Coordinates use zero-based row and column indices.

## Examples

```text
Input: ctor = [[[1,2],[3,4]]], ops = ["sumRegion","update","sumRegion","sumRegion"], args = [[0,0,1,1],[0,1,-2],[0,0,1,1],[0,0,0,1]]
Output: [10,null,6,-1]
Explanation: Replacing 2 with -2 lowers the whole-grid sum by 4; the first row then sums to -1.
```

```text
Input: ctor = [[[-3]]], ops = ["sumRegion","update","sumRegion"], args = [[0,0,0,0],[0,0,5],[0,0,0,0]]
Output: [-3,null,5]
Explanation: A single-cell query returns its current value.
```

## Constraints

- The matrix has between 1 and 200 rows and columns.
- Initial values and update values are between -1000 and 1000.
- Every coordinate is valid and each query has row1 <= row2 and col1 <= col2.
- At most 10,000 operations occur.
- Updates replace values rather than adding to them.
