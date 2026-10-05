## Intuition

Because grid entries are zero or one, a path sums to zero exactly when every visited cell is zero.
The problem therefore becomes counting paths around blocked cells, with three permitted predecessor directions rather than only the usual two.

## Brute force

Enumerating every right, down, and diagonal move sequence repeats the same suffix problems many times.
An all-zero grid already has exponentially many paths, so directly visiting each path is impractical.

## Approach

Process rows from top to bottom and columns from left to right.
`previous[c]` stores paths to the cell directly above; `current[c - 1]` stores paths from the left.
The diagonal contribution is `previous[c - 1]`.
A cell containing one retains zero ways.
The top-left zero cell receives one path as the base case.
Add available predecessor counts modulo `MOD`, then replace `previous` with the completed row.

## Walkthrough

For Example 1, the first row `[0, 1, 1]` produces counts `[1, 0, 0]`.
The second row `[0, 0, 0]` produces `[1, 2, 2]`.
On the last row `[1, 0, 0]`, the blocked first cell contributes zero.
The middle count is `0 + 2 + 1 = 3`, and the final count is `3 + 2 + 2 = 7`.

## Complexity

For r rows and c columns, time is O(rc).
Two row buffers use O(c) auxiliary space; the entire dynamic-programming table is unnecessary.

## Edge cases

A blocked start or destination yields zero paths.
A single zero cell has one path.
Single-row and single-column inputs use only their available predecessor direction.

## Common mistakes

Do not allow a path through a one merely because later zeros follow it.
Do not forget diagonal paths or accidentally reuse the current row as the previous row.

## Language notes

Python integers hold the temporary sum directly.
Java uses long-valued row buffers before reducing modulo 1,000,000,007 and converts only the final reduced value to an integer.
