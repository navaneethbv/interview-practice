## Intuition

Lexicographic order is decided by the first retained column that differs between two neighboring rows.
Once a pair is already strictly ordered, later columns cannot hurt it, so only unresolved pairs constrain future columns.

## Brute force

Trying every subset of columns requires exponential time in the number of columns.
Rebuilding every resulting string for each subset also repeats the same comparisons.

## Approach

1. Track each adjacent row pair with `settled`, meaning an earlier retained column already ordered it.
2. Scan columns from left to right.
3. Delete a column if it decreases any unsettled adjacent pair.
4. Otherwise retain it and mark pairs whose characters are strictly increasing.

## Walkthrough

This is Example 1 from the local statement.
For `strs = ["ca", "bb", "ac"]`, column 0 contains `c,b,a`, so the first comparison decreases and the column must be deleted.
Column 1 then contains `a,b,c`, which orders both adjacent pairs.
The resulting rows are `a,b,c`, so the answer is 1.

## Complexity

The method checks each column against every adjacent pair, taking O(rows * columns) time.
The settled flags use O(rows) auxiliary space and the input strings are not copied.

## Edge cases

A single string has no adjacent pair and needs zero deletions.
Equal characters do not settle a pair because a later column may still decide its order.
If every column causes an unresolved inversion, all columns are deleted.

## Common mistakes

Do not compare a pair again after it has been strictly ordered.
Do not delete a column because it decreases an already settled pair.
Use adjacent pairs only, since their order implies the order of the whole list.

## Language notes

Python uses a list of booleans and generator-based inversion detection.
Java uses a boolean array and explicit loops, preserving the same left-to-right invariant.
