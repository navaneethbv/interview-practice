## Intuition

Fixing a rectangle's top and bottom rows reduces the remaining choice to a contiguous range of columns.
Sum those rows within each column, then find the best contiguous column range using Kadane's algorithm.
Trying every row pair therefore covers every possible nonempty rectangle.

## Brute force

Enumerate all top, bottom, left, and right boundaries and sum each rectangle from scratch.
Even with a two-dimensional prefix sum, there are O(r squared c squared) boundary combinations.
Row compression removes one factor of c from the search.

## Approach

For each `top`, reset `column_sums` to zero.
Advance `bottom` downward, adding that row into the column totals.
Run `_kadane` on the resulting one-dimensional array and maximize the overall `best`.
Kadane maintains the best nonempty segment ending at the current column, choosing between extending it and starting anew.
Initialize both local and global answers from actual entries so all-negative matrices remain valid.

## Walkthrough

Example 1's row band from 0 through 2 compresses to `[12, -5, 3, 9, -5]`.
Kadane's running best-ending sums are 12, 7, 10, 19, and 14.
The maximum 19 occurs across columns 0 through 3.
That corresponds to the statement's rectangle covering all three rows and the first four columns.
No other row band yields a larger sum, so return 19.

## Complexity

For r rows and c columns, there are O(r squared) row bands, each requiring O(c) update and Kadane work.
Time is O(r squared c), and auxiliary space is O(c).
The reference does not transpose the matrix to choose the smaller dimension for the squared factor.

## Edge cases

For all-negative input, the best rectangle is a nonempty least-negative choice, never an empty sum of zero.
Single-row and single-column matrices reduce naturally to one-dimensional cases.

## Common mistakes

Reset column totals for each new top row, but retain them while bottom advances.
Resetting every row band loses accumulated rows.

## Language notes

Python uses list totals and Java uses an int array under the stated sum bounds.
Both Kadane helpers initialize from the first value instead of zero to enforce nonempty selection.
