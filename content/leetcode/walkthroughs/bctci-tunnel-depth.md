## Intuition

The connected tunnel and excavated top corners make the rows monotone for this question: once a row has no excavated cell, deeper rows cannot contain one.
Therefore the last occupied row is the boundary between rows containing a one and rows containing only zeroes.
Binary search can locate that boundary while inspecting only one candidate row per search step.

## Approach

Set `low` to row zero, which is guaranteed to contain excavation, and set `high` to the row count as an exclusive false boundary.
While the two boundaries are not adjacent, inspect the middle row with `any` or a loop over its cells.
If that row contains a one, move `low` down to it; otherwise move `high` up to it.
When the search stops, `low` is the greatest row index containing an excavated cell.

## Walkthrough

For Example 1, row zero contains ones, row one contains a one, and row two is all zeroes.
The first midpoint is row one, so `low` moves to one because excavation reaches that depth.
The remaining boundary is row two, and the method returns row one.
For a full 3 by 3 network, every checked row is occupied and the lower boundary eventually becomes row two.

## Complexity

There are `O(log n)` binary-search iterations, and checking one row can scan `n` cells.
The worst-case running time is therefore `O(n log n)` for an `n x n` matrix.
The search uses `O(1)` auxiliary space.

## Edge cases

The one-row matrix returns zero because the guaranteed top row is also the deepest possible row.
If only row zero is occupied, every deeper check is false and `low` remains zero.
The exclusive `high = n` boundary avoids reading a row beyond the matrix.

## Common mistakes

A full matrix scan satisfies correctness but violates the stated subquadratic goal.
Moving `high` to a false middle row is essential; moving it past that row can skip the answer.
Searching individual columns or assuming the tunnel's shape is rectangular is unnecessary because only row occupancy matters.

## Language notes

Python uses `any(tunnel_network[middle])` to test a row.
Java accumulates a boolean while scanning the row and uses integer division for the midpoint.
Both implementations rely on the problem's monotone row guarantee supplied by connectivity and the top-corner condition.
