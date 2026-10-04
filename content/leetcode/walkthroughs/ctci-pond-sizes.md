## Intuition

Pond cells are connected through all eight neighboring directions, including diagonals.
Each unvisited zero starts one connected component, and a flood fill can count every zero in that component exactly once.
Marking cells when they are added to the stack prevents duplicate visits.

## Approach

Scan every cell in row-major order.
When a zero has not been visited, start `_fill` with that cell and perform iterative depth-first search.
For each popped cell, inspect `dr` and `dc` values from negative one through one, skip out-of-bounds or nonzero neighbors, and mark valid zero neighbors before pushing them.
Append each component size and sort `sizes` before returning.

## Walkthrough

For Example 1, the flood fill from the top-left zero reaches its vertical and diagonal water neighbors and counts four cells.
Other isolated or smaller connected groups produce sizes one and two.
After the scan, sorting those component counts returns `[1, 2, 4]`.
The diagonal loop is what connects water cells that touch only at a corner.

## Complexity

Every cell is visited at most once and checks a constant eight-neighbor set, so the scan and fills take `O(RC)` time.
The visited matrix and worst-case stack use `O(RC)` auxiliary space.
Sorting the `p` pond sizes adds `O(p log p)` time, which is at most `O(RC log(RC))`.

## Edge cases

An all-land matrix produces an empty result.
An all-water matrix becomes one pond because every cell is connected through the eight directions.
Single-cell ponds are recorded with size one and remain present after sorting.

## Common mistakes

Checking only four directions splits diagonal ponds into separate components.
Marking a neighbor only when it is popped allows the same cell to be pushed repeatedly.
Returning discovery order instead of sorting violates the required increasing order.

## Language notes

Python uses a boolean matrix and a list stack, while Java uses `Deque<int[]>` for the same iterative fill.
The nested direction loops include `(0, 0)`, but the current cell is already visited, so that case has no effect.
Both implementations leave land heights unchanged and use zero as the only pond marker.
