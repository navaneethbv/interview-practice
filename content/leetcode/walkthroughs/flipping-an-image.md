## Intuition
Each output position has exactly one source position: the cell mirrored across the middle of its row.
After reading that source bit, subtracting it from one performs the inversion.
Combining these two operations avoids constructing a separately reversed image.

## Brute force
First copy and reverse every row, then make a second pass that inverts all entries.
This already takes optimal O(n^2) time for an n by n image, but requires two transformation passes.
The references construct the final output directly while retaining the original image.

## Approach
1. Allocate a result row for each input row.
2. Read source columns from right to left.
3. Replace each source value with `1 - value` and append it at the next output position.
4. Return the completed image.

Java expresses the mirrored position as `size - 1 - column`.
Python's `reversed(row)` supplies those source values in the same order.
Rows never exchange positions, because the requested flip is horizontal.
Each output cell depends only on its corresponding original cell, so processing one row cannot affect another.

## Walkthrough
Example 1 starts with `[[1,0],[0,0]]`.
The first row is read as `[0,1]` after reversal.
Inverting those two values produces `[1,0]`.
The second row reads as `[0,0]` in either direction, and inversion produces `[1,1]`.
Combining the transformed rows gives `[[1,0],[1,1]]`.
The original input rows are preserved by both references.

## Complexity
Time is O(n^2), because all n squared cells must be read and written.
The returned matrix occupies O(n^2) space.
Beyond the output, the algorithms need only row iteration and index state, so auxiliary space is O(1).
Python's reverse iterator does not create a reversed row copy.

## Edge cases
A one-cell image only needs its single bit inverted.
For odd widths, the central bit remains in the same column but still changes value.
An all-zero row becomes all ones, regardless of its reversal.

## Common mistakes
- Reversing the row order performs a vertical flip instead.
- Returning a reversed row without inversion completes only half the task.
- Using logical negation can produce booleans instead of integer bits in Python.

## Language notes
Python uses nested list comprehensions to allocate independent output rows.
Java creates an `int[][]` result and fills it with indexed loops.
Both rely on the guaranteed binary input values when using subtraction for inversion.
