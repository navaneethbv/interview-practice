## Intuition

A pond is a connected component of zero-valued cells, including diagonal connections.
Starting a flood fill from each unvisited water cell counts one entire component.
Marking cells as they are added to the work stack ensures each water cell contributes exactly once.

## Brute force

Launch a fresh search from every water cell without retaining visited information.
The same large pond would be traversed repeatedly, producing duplicate component sizes and potentially quadratic work in the number of cells.

## Approach

Scan the grid row by row using a `visited` matrix.
For each unvisited zero, call `_fill` and append its returned size.
The fill marks its starting cell, then repeatedly pops a cell and examines all combinations of row and column offsets from -1 through 1.
Enqueue only in-bounds, unvisited water cells, marking them immediately.
Sort the completed component sizes before returning them.

## Walkthrough

In Example 1, zeros `(0, 0)` and `(1, 0)` form a size-two pond.
The zero at `(0, 3)` connects diagonally to `(1, 2)`, which connects to `(2, 2)` and `(3, 2)`, forming size four.
The zero at `(3, 0)` is isolated and contributes size one.
Sorting the discovered sizes produces `[1, 2, 4]`.

## Complexity

For N grid cells and P ponds, traversal takes O(N), followed by O(P log P) sorting.
Visited storage and the explicit stack require O(N) space in the worst case.
The result contains P sizes.

## Edge cases

Diagonal-only contact still joins water into one pond.
An all-land grid returns an empty list.
The original height values are not modified.

## Common mistakes

Checking only four orthogonal neighbors splits ponds that connect diagonally.
Marking only after popping permits duplicate stack entries and can overcount cells.

## Language notes

Python uses coordinate tuples in a list stack.
Java uses coordinate arrays in an `ArrayDeque`.
The offset pair `(0, 0)` is harmless because the current cell is already marked visited.
