## Intuition

A legal digit must be absent from its row, column, and 3 by 3 box.
The solver records those memberships once, then uses backtracking to try a legal digit in the next empty cell.
When a later choice fails, it removes that digit from all three sets and tries the next possibility.

## Brute force

Trying every assignment of nine digits to every empty cell ignores the row, column, and box constraints until the end.
That search is exponential, while the constraint checks prune most invalid branches immediately.

## Approach

1. Collect empty coordinates and populate `row_digits`, `column_digits`, and `box_digits` from the givens.
2. In `_search`, select the empty cell at position `i` and identify its box.
3. For each digit from `1` through `9`, skip it when any constraint set already contains it.
4. Add the digit to the board and all three sets, then recurse to `i + 1`.
5. If recursion fails, remove the digit from the constraint sets and try another candidate.
6. Restore `'.'` before returning failure for that cell; success leaves the solved board in place.

## Walkthrough

Example 1 begins with the first empty cells `(0,2)`, `(0,3)`, `(0,5)`, `(0,6)`, and `(0,7)`.
At `(0,2)`, the row excludes 5, 3, and 7, the column excludes 8, and the top box contains `{3,5,6,8,9}`, so the first trial is 1.
The next first legal trials are 2 at `(0,3)`, 4 at `(0,5)`, 8 at `(0,6)`, and 9 at `(0,7)`.
That 9 eventually makes a later cell impossible, so `_search` removes 9 from the row, column, and box before trying the next candidate.
Python restores `'.'` only after every candidate for that cell fails, while Java clears the cell immediately after each failed recursive trial.
After all empty cells are resolved, the first row is `5 3 4 6 7 8 9 1 2`, matching the stated output.

## Complexity

- Time: O(9^E) worst case for E empty cells, with row, column, and box checks pruning branches.
- Space: O(E + 81), for recursion, empty coordinates, and the fixed constraint sets.

## Edge cases

A completely filled valid board has no empty cells and returns immediately.
Backtracking restores both the board cell and every membership set.
The fixed 9 by 9 dimensions make the constraint tables bounded.
The input is guaranteed to have a solution, so the successful branch remains on the board.

## Common mistakes

- Checking only the row allows duplicate digits in a column or box.
- Forgetting to remove a failed trial poisons later candidate checks.
- Treating `'.'` as a digit adds a fake constraint.

## Language notes

Python stores each used-digit collection as a set and keeps search state on `self`.
Java uses boolean tables indexed by digit and a helper that marks or clears all three tables.
The Java recursion walks the 81 board positions, while Python recurses through only the collected empty cells.
