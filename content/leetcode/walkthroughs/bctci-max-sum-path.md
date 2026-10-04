## Intuition

Every path entering a cell comes from the cell immediately above it or immediately to its left.
Once the better of those two prefix sums is known, adding the current cell value gives the best sum ending here.
The history of any inferior prefix cannot improve a future continuation.

## Brute force

Enumerate every sequence of right and down moves and sum its visited cells.
Many paths share prefixes and suffixes, so this repeats work exponentially in the grid dimensions.

## Approach

Scan rows from top to bottom and each row from left to right.
The one-dimensional array `best` holds the previous row's answers before a column is processed.
At column `c`, `best[c]` still represents the cell above, while `best[c - 1]` already represents the current row's left neighbor.
Set the new entry to the cell value plus the larger predecessor sum.
Use zero for a missing predecessor along the top or left boundary.
This is valid here because values are positive, so a real path prefix is never worse than the missing-predecessor sentinel.
After the final row, the last entry is the answer.

## Walkthrough

Example 1 first produces `best = [1, 5, 8]` for the top row.
The second row transforms it into `[3, 12, 18]`.
The final row transforms it into `[8, 20, 29]`.
The sum 29 follows values 1, 4, 7, 8, and 9, choosing the best predecessor at each step.

## Complexity

For r rows and c columns, both references take O(r times c) time and O(c) auxiliary space.
They return only the optimal sum, so they do not store predecessor pointers or reconstruct a path.

## Edge cases

A single row or column has exactly one permitted path.
A one-cell grid returns that cell's value.

## Common mistakes

Scanning columns in reverse would overwrite the wrong dependency.
Zero boundary sentinels would need reconsideration if negative cell values were allowed.

## Language notes

Python creates a list of column totals; Java uses an `int[]`.
The stated dimensions and value bounds keep the maximum path sum within Java's signed integer range.
