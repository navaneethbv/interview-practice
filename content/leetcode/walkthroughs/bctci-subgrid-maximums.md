## Intuition

A suffix rectangle beginning at one cell consists of that cell, the suffix rectangle below it, and the suffix rectangle to its right.
Taking the maximum across those three sources gives the desired answer.
Their overlap is harmless because repeated consideration does not change a maximum.

## Brute force

For every starting cell, scan every cell in its bottom-right suffix rectangle.
Across an r by c grid, this can require O(r squared times c squared) work.

## Approach

Copy the input grid into `best`, so every answer initially includes its own cell value.
Process rows bottom to top and columns right to left.
If a row below exists, combine its already computed suffix maximum with the current entry.
If a column to the right exists, combine that suffix maximum too.
By this processing order, both dependencies are available when needed.
Their union covers every cell in the target suffix rectangle, so the resulting maximum is complete.
Unlike suffix sums, this recurrence does not subtract the diagonal overlap because maximum is idempotent.

## Walkthrough

Example 1's bottom row `[2, 0, 2]` becomes suffix maxima `[2, 2, 2]`.
The middle row `[4, -1, 0]` then becomes `[4, 2, 2]` by combining rightward and downward maxima.
The top row `[1, 5, 3]` becomes `[5, 5, 3]`.
Together these rows give the displayed result.
In particular, cell `(1, 1)` returns 2 from its lower-right rectangle rather than the larger 5 outside that rectangle.

## Complexity

Each cell is copied once and combined with at most two neighbors.
Both references take O(r times c) time and O(r times c) storage for the returned grid.
Only loop indices are needed beyond that output.

## Edge cases

A one-cell grid returns its own value.
Single rows and columns reduce to ordinary suffix maxima.
Negative-only grids work because initialization copies actual values instead of using zero as a fake candidate.

## Common mistakes

Traverse backward so dependencies are already complete.
Do not subtract an overlapping maximum as if this were a sum recurrence.

## Language notes

Python copies rows with slices.
Java clones each row, preserving the original grid and preventing shared mutable row storage.
