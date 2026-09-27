## Intuition
Instead of guessing a starting health and simulating paths forward, compute the minimum health required when entering each cell.
From a cell, the next step can be right or down, so only the smaller requirement of those two successors matters.
The requirement is at least one after applying the current cell's signed effect.

## Brute force
Enumerating every right and down path is exponential, and simulating each path separately repeats suffix work.
A two-dimensional dynamic-programming table would solve overlapping suffixes, but one row of future values is enough.

## Approach
1. Process cells from bottom right toward top left.
2. Keep `minimum_health[column]` as the requirement for the cell below the current row, with a sentinel beyond the right edge.
3. Choose the smaller requirement from down and right.
4. Subtract the current cell's value and clamp the result to at least one.
5. The first entry after processing the grid is the starting health.

## Walkthrough
Example 1 is `[[-2, -3], [5, -1]]`.
At the bottom right `-1`, the knight needs 2 health on entry.
At `5`, the right successor needs 2, so entering this cell needs `max(1, 2 - 5) = 1`.
At `-3`, the best successor requirement is 2, so it needs 5.
At the start `-2`, the best next requirement is 1 from moving down, giving `max(1, 1 - (-2)) = 3`.
Thus starting with 3 health permits the down then right path.

## Complexity
Every cell is processed once, so time is O(RC).
The one-dimensional array uses O(C) additional space.

## Edge cases
A positive start cell still requires one health before entering it.
A negative cell can increase the requirement above one.
The sentinel prevents choosing a path outside the grid.

## Common mistakes
Choosing the larger successor requirement can reject a valid path.
Allowing health to reach zero violates the survival condition.
Processing forward loses the information needed from both possible suffixes.

## Language notes
Python uses `float("inf")` as the sentinel and arbitrary precision integers.
Java uses a large finite `int` sentinel, which is safe for the stated maximum damage.
Both references overwrite one column value after using its two successor requirements.
