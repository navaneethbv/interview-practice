## Intuition

A cycle exists when equal-valued cells are connected and a traversal reaches a visited cell that is not the immediate parent.
The grid is an undirected graph, so tracking the parent prevents every ordinary edge from looking like a cycle.

## Brute force

Starting a fresh search for every cell and ignoring visited state repeats components and can become quadratic in the number of cells.
One traversal per component marks all equal-valued cells once.

## Approach

1. Iterate over cells and start an iterative DFS for each unseen component.
2. Store each stack entry with its row, column, and parent coordinates.
3. Consider only in-bounds neighbors with the same character.
4. Return true when a same-valued neighbor is already seen and is not the parent.

## Walkthrough

For Example 1, every cell in the 2 by 2 grid is `a`.
DFS visits the top-left cell, then its neighbors, marking the top-right and bottom-left cells.
When traversal reaches the bottom-right cell, it can see a previously visited same-valued neighbor other than its parent, closing the square cycle.
The result is true.

## Complexity

For R rows and C columns, each cell and edge is processed O(1) times, so time is O(RC).
Python uses a coordinate set and an explicit stack, while Java uses a boolean matrix and an `ArrayDeque`.
Both require O(RC) auxiliary space.

## Edge cases

A one-row component cannot make a cycle under four-direction movement.
Different characters stop traversal even when cells are adjacent.
The parent edge must be ignored exactly once.

## Common mistakes

Do not treat any visited neighbor as a cycle without checking the parent.
Do not cross diagonally.
Mark a cell when pushing it so duplicate stack entries cannot occur.

## Language notes

Python's `_cycle_from` helper stores parent coordinates in each tuple.
Java's `containsCycleFrom` helper uses four-direction arrays and primitive boolean storage.
