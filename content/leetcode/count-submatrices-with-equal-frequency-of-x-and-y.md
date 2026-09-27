# Count Submatrices With Equal Frequency of X and Y

Count rectangular submatrices that include the top-left cell, contain at least one X, and contain equally many X and Y cells.
Other cells are dots and do not affect the counts.

## Examples

### Example 1

```text
Input: grid = [["X", "Y"], [".", "."]]
Output: 2
Explanation: The entire first row and the entire matrix qualify.
```

### Example 2

```text
Input: grid = [[".", "."]]
Output: 0
Explanation: No submatrix contains an X.
```

## Constraints

- 1 <= grid.length, grid[0].length <= 1000
- Cells contain X, Y, or .
