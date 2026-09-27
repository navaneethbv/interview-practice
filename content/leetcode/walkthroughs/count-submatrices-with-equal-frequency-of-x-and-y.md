## Intuition
Every counted submatrix must include the top-left cell, so only its bottom-right corner varies.
For each row boundary, maintain the number of X and Y cells in every prefix column.
Equal totals at a column identify a qualifying rectangle, and a positive X total enforces the nonempty-X rule.

## Brute force
Counting X and Y separately for every top-left-anchored rectangle repeats the same cells and can be quadratic in the grid area.
Column prefix totals remove the repeated row scans.

## Approach
1. Maintain cumulative X and Y totals for each column.
2. For each row, maintain the row's X and Y prefix counts.
3. Add those row prefixes into the column totals.
4. Count a bottom-right column when its X total is positive and equals its Y total.

## Walkthrough
For Example 1, the first row `X,Y` contributes totals `[X:1,Y:0]` then `[X:1,Y:1]`.
The first column does not qualify because it has one X and no Y.
The second column qualifies for the first-row rectangle, and after the second row the full two-by-two rectangle still has one X and one Y.
The result is 2.

## Complexity
For an R by C grid, each cell is processed once, so time is O(RC).
The two column-total arrays use O(C) auxiliary space, aside from the answer.

## Edge cases
Dots add nothing.
A rectangle with equal totals but no X must not be counted.
The input may contain only dots, producing zero.

## Common mistakes
Keep cumulative values by column across rows.
Do not count a zero-X rectangle.
Remember that every rectangle must include the top-left cell.

## Language notes
Python treats boolean comparisons as integer increments.
Java updates explicit integer counters for each row and column.
