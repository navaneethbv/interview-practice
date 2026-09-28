## Intuition
Each row and each column is sorted from larger values to smaller values, so the negative suffix of a row moves left as we go down.
A shared column pointer locates the negative suffix in every row and never moves right.

## Brute force
Checking every cell and counting values below zero is O(RC) time and O(1) auxiliary space.
The shared pointer improves the worst-case bound to O(R + C) by reusing the previous row's boundary.

## Approach
1. Set `column` to the last column before visiting the rows.
2. In each row, move the shared pointer left while its value is negative.
3. Add `C - column - 1`, the size of that row's entire negative suffix.
4. Continue with the same pointer in the next row because a column already negative stays negative below.

## Walkthrough
Example 1 is `[[4, 3, -1], [2, 0, -2], [-1, -2, -3]]`.
At row 0 column 2, `-1` moves the shared column pointer left to column 1 and counts one negative in that row.
At row 1 column 1, `0` means column 2 is negative, so that row adds one.
At row 2 column 1, `-2` moves left to column 0, then `-1` moves left past the row and adds all three cells.
The total is `1 + 1 + 3 = 5`, matching the returned answer.

## Complexity
The pointer moves at most R steps down and C steps left, so the time is O(R + C).
The counters and two indices use O(1) auxiliary space.

## Edge cases
An all-nonnegative matrix moves down until the scan ends and returns zero.
An all-negative matrix counts every row while moving left.
Single-row and single-column matrices follow the same two moves.

## Common mistakes
Moving right after finding a negative value loses the column suffix that is already known to be negative.
After the loop, the pointer identifies the last nonnegative cell, so subtract one when calculating the suffix size.
Resetting the pointer for each row loses the O(R + C) bound.

## Language notes
Python indexes the current row and column directly and mutates only integer counters.
Java uses the same staircase invariant with `int` arithmetic because the result is at most `R * C`.
