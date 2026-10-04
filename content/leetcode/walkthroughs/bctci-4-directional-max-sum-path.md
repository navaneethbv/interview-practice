## Intuition

Four movement directions allow routes to turn back, but revisiting a cell is forbidden.
The relevant state therefore includes the cells already used by the current path, not just its endpoint.

## Brute force

Enumerating simple paths is the reference approach because the grid is small.
A usual right and down dynamic program misses legal detours, while a greedy choice can sacrifice a better total later.

## Approach

Mark the starting cell in `visited` and call `walk` with its value as `total`.
For every in bounds unvisited neighbor, mark it, recurse with the added value, and unmark it afterward.
At the destination, update `best` and stop that branch.

## Walkthrough

For Example 1, one optimal route visits values 1, -2, 5, -4, 7, -4, 3, -6, and 9.
Its coordinates snake through the entire grid without repetition.
The accumulated sum is 12, and exhaustive exploration finds no larger destination total.

## Complexity

Let N be the number of cells.
A conservative upper bound is O(4^N) time because each recursive level considers at most four directions and a path uses at most N cells.
The visited matrix and recursion require O(N) auxiliary space.

## Edge cases

A one cell grid returns that cell, even when it is negative.
An all negative grid still requires a complete start to destination path.
Negative intermediate totals cannot safely be discarded because later cells might improve them.

## Common mistakes

Unmark a cell only after its recursive branch returns.
A global permanent visited set would incorrectly block alternate paths.
Initializing the best answer to zero would fail when every possible path has a negative sum.

## Language notes

Python stores `best` in a one element list so the nested function can update it.
Java uses an instance field initialized to `Integer.MIN_VALUE`.
Both use the same four neighbor moves and leave grid values unchanged.
