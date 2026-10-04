## Intuition

The infinite board need not be allocated in advance.
Only black cells differ from the default white background, so a set of black coordinates describes the changing state.
A running bounding rectangle records the finite region that must eventually be printed.

## Brute force

Allocate a very large grid and simulate within it.
This wastes space and still risks choosing bounds too small for a valid walk.
Sparse coordinates permit movement in every direction without resizing a dense board during simulation.

## Approach

Start at row zero, column zero, facing right with an empty `black` set.
On a black cell, remove it and turn left; on a white cell, add it and turn right.
Move one cell according to `HEADINGS = RDLU` and `STEPS`.
Update top, bottom, left, and right to include the new location.
After K moves, render the bounding rectangle, printing the heading at the final ant location, X for other black cells, and underscore for white cells.

## Walkthrough

Example 1 uses K equal to zero.
The movement loop does not execute, so the black set remains empty and all four bounds remain zero.
Rendering visits only coordinate `(0, 0)`.
That coordinate contains the ant, whose initial heading is R, so its heading overrides the underlying white-cell symbol.
The result is the single line `["R"]`.

## Complexity

Simulation takes expected O(K) time with hash-set operations.
If the rendered rectangle contains A cells, output generation takes O(A) time and space.
The black set holds at most O(K) coordinates, giving total O(K + A) time and space including output.

## Edge cases

Coordinates may become negative.
The final ant cell must be included even if it has never been flipped.
Returning to a black cell makes it white again.

## Common mistakes

The turn happens before movement.
Updating bounds before including the new position can crop the final ant from the output.

## Language notes

Python uses coordinate tuples as set keys.
Java packs signed row and column values into a long key, masking the column's low 32 bits to prevent collisions.
