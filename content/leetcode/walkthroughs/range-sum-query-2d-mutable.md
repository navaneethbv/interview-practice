## Intuition

A two-dimensional Fenwick tree stores partial sums whose row and column ranges end at each indexed cell.
An update changes one value by a delta, and a prefix query combines O(log R log C) tree cells.

## Brute force

Recomputing a rectangle after every update costs O(RC) per query.
A static prefix table cannot handle updates without rebuilding.

## Approach

1. Keep the current values so replacement updates can compute a delta.
2. Add each delta through Fenwick row and column jumps.
3. Compute a prefix sum by descending both indices.
4. Use four prefixes for `sumRegion` inclusion-exclusion.

## Walkthrough

For Example 1, the initial matrix sum is 10.
Updating `(0,1)` from 2 to -2 applies delta -4, making the full sum 6.
The first row then contains 1 and -2, so its query returns -1.

## Complexity

Construction performs RC point updates, costing O(RC log R log C).
Each update and prefix query costs O(log R log C), and a rectangle uses four prefixes.
The value and tree tables use O(RC) space in both languages.

## Edge cases

An update stores the replacement value, not an increment.
Single-cell regions use the same four-prefix formula.
Negative deltas are valid.

## Common mistakes

Update the stored value before future deltas.
Use one-based Fenwick indices internally.
Include both rectangle boundaries.

## Language notes

Python uses nested lists and lowbit jumps.
Java keeps final arrays and performs the same row and column updates.
The stored value grid is necessary because update receives a replacement value and the tree needs its difference from the old value.
