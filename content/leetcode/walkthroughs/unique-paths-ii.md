## Intuition

Every path reaching a cell comes from its top or left neighbor.
A one-dimensional dynamic-programming array stores those counts for the current row, and setting an obstacle's entry to zero blocks all later paths through it.

## Brute force

Recursively branching right and down explores every possible path, which is exponential in the grid dimensions.
Memoization reduces repeated work but stores a value for every cell when one rolling row is enough.

## Approach

1. Initialize `paths[0] = 1` before processing the grid.
2. For each cell, set `paths[column]` to zero when it is blocked.
3. Otherwise add the left value when a left neighbor exists; the old value already represents the top count.
4. Return the last entry after all rows are processed.

## Walkthrough

For Example 1, `[[0,0,0],[0,1,0],[0,0,0]]` gives first-row state `[1,1,1]`.
The first cell of the second row leaves it `[1,1,1]`, then the blocked center resets its entry to zero, giving `[1,0,1]`.
On the final row, column zero remains one, column one adds its left neighbor to become one, and column two adds that new one to become two.
The completed state is `[1,1,2]`, so the destination has two paths.
The obstacle removes the route through the center while preserving one route around each side.

## Complexity

The grid is scanned once, so time is O(rows * columns).
The rolling array uses O(columns) auxiliary space, excluding the input grid and scalar result.
The local contract bounds the returned count by the signed Java `int` range.
An intermediate state with more paths cannot have any unobstructed route to the destination, since otherwise the final answer would also exceed that bound.

## Edge cases

A blocked start sets `paths[0]` to zero immediately.
A blocked destination returns zero because its cell is reset when processed.
A one-cell open grid retains the initial count of one.

## Common mistakes

Do not leave an obstacle's old count in place, or paths will pass through it.
Process cells left to right so the current `paths[column]` is still the top count before it is updated.
Do not initialize every cell to one, because only the starting cell has an initial path.

## Language notes

Python uses a list of integers, and Java uses an `int[]` matching the local return contract.
The statement bounds keep the result within the Java `int` range.
