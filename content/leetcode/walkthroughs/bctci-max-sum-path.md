## Intuition

Every path into a cell must come from directly above or directly left.
The best path into the cell therefore extends the better of those two completed subpaths, giving a local recurrence that also guarantees a globally optimal result.

## Brute force

Enumerate every right/down path and sum its cells.
The number of move sequences grows combinatorially with grid dimensions, and many paths share the same prefixes and suffixes.

## Approach

Use a single array `best`, one entry per column.
Process the grid row by row from left to right.
Before updating `best[c]`, it represents the best sum from above; `best[c - 1]` already represents the updated sum from the left.
Store the current cell's value plus the larger predecessor sum.
At boundaries, a missing predecessor contributes zero, which is safe because all grid values are positive.
The final array entry is the best sum reaching the bottom-right cell.

## Walkthrough

Example 1 begins with first-row totals `[1, 5, 8]`.
Processing the second row produces `[3, 12, 18]`.
The last row produces `[8, 20, 29]`.
At the destination, the algorithm prefers the left total 20 over the above total 18 and adds 9.
One maximizing path is `1, 4, 7, 8, 9`, with total 29.

## Complexity

For r rows and c columns, time is O(rc).
The one-dimensional buffer uses O(c) auxiliary space, and the input grid is not modified.

## Edge cases

A single cell returns its own value.
A single row or column has only one path, so every value is included.
Tied predecessor sums need no special handling because only the total is requested.

## Common mistakes

Do not overwrite the above value before using it.
Scanning columns right to left would break the intended meaning of the left predecessor.

## Language notes

Both references use the same buffer update order.
Java integer totals are sufficient under the positive-value and 1,000-by-1,000 bounds because a path visits at most 1,999 cells.
