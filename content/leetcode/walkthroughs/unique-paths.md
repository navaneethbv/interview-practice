## Intuition

Every arrival at an interior cell comes either from directly above or directly to its left.
Add the numbers of paths reaching those two neighbors to count paths to the cell.
Since a row depends only on the preceding row and its own left neighbor, one array can hold the DP state.

## Brute force

Recursively enumerate every right/down move sequence until reaching the destination.
The number of routes grows combinatorially, and many branches recompute routes from the same cell.
Dynamic programming shares those overlapping subproblems.

## Approach

1. Use grid DP with a single array `row` of n ones, representing the top row.
2. For each remaining grid row, scan `column` from one through n minus one.
3. Update `row[column] += row[column - 1]`.
4. Leave the first column equal to one, since it can only be reached from above.
5. Return the last entry after processing all m rows.

Before an update, `row[column]` still holds the count from above.
The entry to its left has already been updated for the current grid row.
Their sum therefore implements the two-neighbor recurrence without a full matrix.

## Walkthrough

Example 1 uses `m = 3` and `n = 4`.

| Grid row | DP array after the row |
| --- | --- |
| Top row | `[1, 1, 1, 1]` |
| Second row | `[1, 2, 3, 4]` |
| Third row | `[1, 3, 6, 10]` |

On the final update, the destination receives 4 paths from above and 6 from its left neighbor.
The answer is 10.
These paths contain two down moves and three right moves in different orders.

## Complexity

- Time: O(mn), visiting every interior cell once.
- Space: O(n), storing one row of counts.

## Edge cases

A one-row grid keeps the initialized row of ones.
A one-column grid never enters the inner loop and also returns one.
A one-cell grid has one empty route from start to destination.
All dimensions are positive under the stated constraints.

## Common mistakes

- Initializing the whole DP array to zero prevents paths from entering the grid.
- Scanning columns backward reads the previous-row left neighbor instead of the current one.
- Counting the starting cell as a required move changes the route length.

## Language notes

Python creates the initial list with `[1] * n`, while Java uses `Arrays.fill`.
All cell counts are no larger than the final destination count, since each partial path can be extended to the destination.
The stated final bound therefore makes every Java `int` update safe.
