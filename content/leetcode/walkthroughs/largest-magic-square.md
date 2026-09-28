## Intuition
A candidate square is magic when its rows, columns, and two diagonals all have the same sum.
Prefix sums let each row, column, or diagonal sum be read in constant time, so the expensive part is testing candidate sizes rather than summing cells repeatedly.
Trying larger squares first allows an immediate return when the largest valid one is found.

## Brute force
Recomputing every row and column sum for every square can take O(m^2 n^2) or worse on an m by n grid.
The repeated cell scans obscure the simple equality checks.

## Approach

1. Build row and column prefix sums, plus diagonal prefix tables.
2. Try side lengths from `min(rows, columns)` down to 1.
3. For each top-left corner, use the first row as the target sum.
4. Check every other row, column, and both diagonals against that target.
5. Return the first side length that passes.

## Walkthrough

For Example 1, `[[8,1,6],[3,5,7],[4,9,2]]`, the first candidate has side 3 and target row sum 15.
The other rows sum to 15, the three columns sum to 15, and the two diagonals are `8+5+2 = 15` and `6+5+4 = 15`.
Every condition passes, so the algorithm returns 3 without testing smaller candidates.
For `[[1,2],[3,4]]`, side 2 has unequal rows and columns, so the search continues to side 1, which is valid.

## Complexity
There are O(mn) candidate positions for each side length, and at most O(min(m,n)) side lengths.
Each candidate checks O(m+n) rows and columns, so the direct bound is O(mn min(m,n)(m+n)) time after prefix construction.
The prefix tables use O(mn) auxiliary space.

## Edge cases
A rectangular grid may have its largest square limited by its shorter dimension.
Negative values would still work with sums, although the stated inputs are positive.
Every one-cell square qualifies because all required sums refer to the same cell.

## Common mistakes
Check both diagonals, including the anti-diagonal.
Do not compare columns against a sum from a different candidate row.
Return side length rather than area.

## Language notes
The references keep prefix indexing explicit so rectangular grids work correctly.
Java uses integer arrays for prefix sums under the stated value bounds.
