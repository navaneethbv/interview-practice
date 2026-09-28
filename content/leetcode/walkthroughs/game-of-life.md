## Intuition

Each cell needs the previous generation's neighbors while the board is being updated in place.
The low bit stores the old state and the second bit stores the next state, so both generations coexist until the final shift.

## Brute force

Copying the entire board before counting neighbors is simple but uses O(RC) extra space.
Two bits per cell preserve the original state without a second grid.

## Approach

1. Count live neighbors from each cell's low bits.
2. Set the second bit when the next state should be alive.
3. After all cells are evaluated, shift every cell right once.

## Walkthrough

For Example 1, the vertical line has the center cell with two live neighbors and its endpoints with one.
The endpoints die, while the dead cells beside the center each see three live neighbors and become alive.
After the final shift, the board is the horizontal line shown in the example.

## Complexity

For R rows and C columns, each cell checks at most eight neighbors, so time is O(RC) and auxiliary space is O(1).
The board itself remains the O(RC) storage.
Python and Java both use low and second bits for old and new states.

## Edge cases

A lone live cell dies.
A live cell with two or three neighbors survives.
Edges treat outside cells as dead.

## Common mistakes

Read neighbors with `& 1` during the first pass.
Do not shift a cell before all neighbor counts use the old bit.
Set the next bit only for the two live-state rules.

## Language notes

Python extracts neighbor counting into a helper.
Java uses a helper and bitwise integer operations on the supplied matrix.
