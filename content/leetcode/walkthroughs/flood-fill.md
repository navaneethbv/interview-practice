## Intuition

The starting pixel belongs to a connected component defined by edge-adjacent pixels of `original_color`.
A stack or queue can explore that component while recoloring each cell as soon as it is discovered.
Recoloring on discovery also acts as the visited marker, so a separate visited matrix is unnecessary.

## Brute force

Scanning the whole image repeatedly until no matching neighbor remains can take O((RC)²) time for an R by C image.
A recursive flood fill takes O(RC) time, but a large connected image can use O(RC) call-stack space and exceed a language's call stack.

## Approach

1. Save the starting value as `original_color` and return immediately if it already equals `color`.
2. Push `(sr, sc)`, recolor that cell, and repeatedly pop a pending cell.
3. Check its four edge neighbors with `in_bounds`.
4. When a neighbor still has `original_color`, recolor it and push it for later exploration.
5. Return the mutated `image` after the stack is empty.

## Walkthrough

Example 1 starts with `[[1, 1], [1, 0]]`, at `(0, 0)`, using color 2.

| pending cell | newly recolored neighbors | image afterward |
| --- | --- | --- |
| `(0, 0)` | `(1, 0)`, `(0, 1)` | `[[2, 2], [2, 0]]` |
| `(0, 1)` | none | unchanged |
| `(1, 0)` | none | unchanged |

The pixel at `(1, 1)` has color zero rather than `original_color = 1`, so it remains unchanged even when reached as a neighbor.

## Complexity

- Time: O(rows * columns), because each reachable cell is processed once and checks four neighbors.
- Space: O(rows * columns) in the worst case for the pending stack, where rows * columns is the image size.

## Edge cases

If the new color equals the original color, the early return prevents pointless work.
A one-cell image is recolored directly.
Pixels connected only diagonally are not visited.
The method handles color values at the full constraint range without using color as an index.

## Common mistakes

- Marking a cell only when popping can enqueue it multiple times.
- Checking diagonal neighbors changes the definition of connectedness.
- Reading the original color after recoloring the start makes later comparisons incorrect.

## Language notes

Python uses a list as an explicit stack and tuple coordinates.
Java uses an `ArrayDeque<int[]>` and separate direction arrays, while `isOriginalPixel` keeps boundary checks in one helper.
Both implementations mutate the judge-provided image and return it.
