## Intuition

Choose the top and bottom rows of a candidate rectangle, then collapse those rows into one column-sum array.
The best rectangle for that row band is the best contiguous subarray of column sums.
Kadane's algorithm finds that subarray while preserving negative-only answers.

## Approach

For each `top` row, reset `column_sums` to zero.
Extend `bottom` one row at a time and add that row into `column_sums`.
Run `_kadane` on the accumulated columns to find the best left and right boundaries for the current row band.
Keep the largest result across all row pairs, initializing it to the first matrix value so every rectangle remains nonempty.

## Walkthrough

For Example 1, fixing the top at row zero and extending through the bottom rows produces several column-sum arrays.
When the bottom reaches row two, the column sums for columns zero through three form the best contiguous total of nineteen.
Kadane's scan keeps that positive run and rejects a trailing negative contribution when it would reduce the current sum.
The outer loops compare it with every other row band and return nineteen.

## Complexity

There are `O(R^2)` top and bottom row pairs, and each pair updates and scans `C` columns.
The running time is `O(R^2 C)` and the accumulated column array uses `O(C)` auxiliary space.
If rows are fewer than columns, transposing the conceptual orientation could improve constants, but the reference intentionally uses the given row order.

## Edge cases

A one-cell matrix returns that cell, including when it is negative.
An all-negative matrix returns the largest individual value rather than zero.
Zero values can produce a valid zero rectangle, and Kadane still keeps the rectangle nonempty.

## Common mistakes

Initializing the answer to zero incorrectly rejects matrices whose best rectangle is negative.
Resetting `column_sums` inside the bottom loop prevents the row-band accumulation from representing a rectangle.
Allowing Kadane to restart at an empty subarray violates the nonempty rectangle requirement.

## Language notes

Python updates `column_sums` with an inner loop and calls `_kadane` after each bottom row.
Java mirrors those loops and keeps all arithmetic in `int`, matching the spec's bounded values and expected output type.
Both references return only the maximum sum, not the rectangle coordinates.
