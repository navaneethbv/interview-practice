## Intuition

The unvisited cells always form a smaller rectangle after a full outer layer is read.
Track that rectangle with `top`, `bottom`, `left`, and `right` boundaries.
Reading one edge and moving its boundary inward prevents visiting those cells again.

## Brute force

Simulate a moving cursor with a visited matrix and turn whenever the next step is blocked.
This takes O(RC) time but uses O(RC) visited storage.
Four shrinking boundaries encode the same progress with constant auxiliary space.

## Approach

1. Initialize the four boundaries around the entire matrix.
2. Read the top edge left to right, then increment `top`.
3. Read the right edge top to bottom, then decrement `right`.
4. If a row remains, read the bottom edge right to left and decrement `bottom`.
5. If a column remains, read the left edge bottom to top and increment `left`.
6. Repeat while both boundary ranges remain nonempty.

The conditional lower and left edges prevent rereading a final singleton row or column.
Updated boundaries also exclude corners already emitted by the preceding edge.

## Walkthrough

Example 1 is `[[1, 2, 3], [4, 5, 6]]`.

| Edge | Values appended | Boundary change |
| --- | --- | --- |
| Top | 1, 2, 3 | `top = 1` |
| Right | 6 | `right = 1` |
| Bottom | 5, 4 | `bottom = 0` |
| Left | None, row range is empty | `left = 1` |

Now `top > bottom`, so stop.
The output is `[1, 2, 3, 6, 5, 4]` with each cell included once.

## Complexity

- Time: O(RC), because each cell is appended once.
- Space: O(RC) for the result and O(1) auxiliary boundary state.

## Edge cases

A one-row matrix is consumed by the first edge.
A one-column matrix is consumed by the top cell and downward edge.
Odd dimensions can leave a final center cell, handled by the same boundary checks.
The matrix itself is not modified.

## Common mistakes

- Reading all four edges unconditionally duplicates cells in thin final layers.
- Moving a boundary before reading its edge skips cells.
- Including old corner bounds rereads corners.

## Language notes

Python uses explicit range loops and does not create row slices.
Java extracts row and column appends into helpers with `step` equal to 1 or -1.
Those helpers use a direction-aware inclusive comparison, so an exhausted edge performs no reads.
