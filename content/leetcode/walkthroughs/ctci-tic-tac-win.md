## Intuition

A winning line is a complete row, column, or one of the two full diagonals containing one player's mark.
The board therefore has only `2n + 2` candidate lines.
Checking those lines directly is simpler than searching arbitrary paths through neighboring cells.

## Brute force

For every occupied cell, try tracing a full line in several directions.
This repeats row and column checks many times and introduces unnecessary start-position and boundary cases.
The valid complete lines can be enumerated exactly once instead.

## Approach

The Python reference collects all rows, constructs all columns, and appends both diagonals.
For each candidate, reject it if its first character is a space.
Otherwise compare the whole line with that first character repeated n times.
Return the matching mark immediately, or return the empty string when no candidate wins.
The input's game-state guarantees make it unnecessary to resolve conflicting winners.

## Walkthrough

Example 1 is `["XO ", "XO ", "X  "]`.
Each row contains different characters or spaces, so no row wins.
The first column is `XXX`, whose first character is not blank and whose three characters all agree.
That column wins for X.
Return `"X"` without needing a diagonal match.
The other columns do not alter the discovered winner.

## Complexity

For an n by n board, time is O(n squared).
Python allocates column and diagonal strings, using O(n squared) auxiliary space.
Java checks lines in place through its `winner` helper and uses O(1) auxiliary space.

## Edge cases

A board with no winning line returns the empty string.
An all-space line is never a win.
A one-cell board can win if its sole cell is a player's mark.

## Common mistakes

Do not hard-code a three-cell board when n is variable.
A diagonal with only some matching marks is insufficient; every position on the complete diagonal must agree.

## Language notes

Python compares constructed strings.
Java passes row and column step sizes to `winner`, using `charAt` to examine the same logical lines without allocating them.
