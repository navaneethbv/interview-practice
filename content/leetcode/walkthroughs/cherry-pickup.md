## Intuition

The outward and return trips can be viewed as two walkers moving from the start to the destination at the same time.
After `step` moves, a walker's column is `step - row`, so the state needs only both row coordinates.
If both walkers share a cell, its cherry is counted once.

## Brute force

Enumerating an outward path and a return path separately is exponential and duplicates choices that meet at the same step.
Dynamic programming merges those paths into one state per pair of rows.

## Approach

1. Initialize the state `(0, 0)` with the start cell's value.
2. For each diagonal `step`, derive both columns from the candidate rows.
3. Reject out-of-bounds and thorn cells, then take the best of the four predecessor row pairs.
4. Add one or two cell values depending on whether the walkers share a row.
5. Return the destination state, clamped to zero when no complete route exists.

## Walkthrough

For Example 1, the grid is `[[1, 1], [1, 1]]`.
At step 0 both walkers start at `(0, 0)` and collect one cherry.
At step 1, one can move down while the other moves right, collecting two distinct cherries.
At step 2 both reach `(1, 1)` and add the final cherry once.
The total is `4`.

## Complexity

There are `O(n)` steps and `O(n^2)` row-pair states per step, each with constant predecessor work, for `O(n^3)` time.
Two `n` by `n` arrays are used, so space is `O(n^2)`.

## Edge cases

If a thorn blocks every complete route, the destination state remains unreachable and the method returns zero.
When both walkers occupy the same cell, that cell contributes once even if it contains a cherry.

## Common mistakes

- Adding both values when rows match double-counts a cherry.
- Forgetting that columns are `step - row` allows impossible coordinates.
- Returning a negative sentinel instead of the required zero for an impossible trip violates the statement.

## Language notes

Python keeps only reachable states in a dictionary, while Java uses dense arrays initialized to `Integer.MIN_VALUE`.
Java checks the sentinel before adding gains to avoid arithmetic on unreachable states.
