## Intuition

An island is one connected component of land cells under horizontal and vertical movement.
When the scan finds land outside `seen`, it has discovered exactly one new component.
A breadth-first search (BFS) marks that whole component before the scan continues, preventing its other cells from being counted again.

## Brute force

Launching a fresh traversal from every land cell without sharing visited information repeatedly explores the same component.
To deduplicate the answers, one could compute a representative cell for every traversal, costing up to O((rows × columns)²) time.
A shared `seen` structure avoids this repeated work.

## Approach

1. Use grid BFS with a global `seen` structure and an `islands` counter initially set to zero.
2. Scan each `row` and `column`.
3. When a cell is unseen land, increment the count and start `flood` there (`_flood` in Python).
4. Mark the starting cell before adding it to `queue`.
5. Remove the next cell, inspect its four neighbors, and enqueue each unseen land neighbor after marking it.
6. Resume the outer scan when the queue is empty.

Marking on insertion ensures that each land cell enters the queue at most once.
The flood never crosses water or a grid boundary, so it marks exactly one island.

## Walkthrough

Example 1 contains rows `110`, `010`, and `001`.
Coordinates below are zero-based.

| Event | `queue` after processing | `seen` additions | `islands` |
| --- | --- | --- | --- |
| Discover `(0, 0)` | `[(0, 0)]` | `(0, 0)` | 1 |
| Process `(0, 0)` | `[(0, 1)]` | `(0, 1)` | 1 |
| Process `(0, 1)` | `[(1, 1)]` | `(1, 1)` | 1 |
| Process `(1, 1)` | `[]` | None | 1 |
| Discover `(2, 2)` | `[(2, 2)]` | `(2, 2)` | 2 |
| Process `(2, 2)` | `[]` | None | 2 |

The scan skips the already visited upper cells, and the isolated bottom-right cell starts the second island.
The answer is 2.

## Complexity

- Time: O(rows × columns), because every cell is scanned and each visited land cell checks four neighbors.
- Space: O(rows × columns), for `seen` and the BFS queue in the worst case.

## Edge cases

All-water grids produce zero islands.
A single land cell produces one, and diagonal contact alone does not connect cells.
Long connected paths are safe from recursion limits because the traversal is iterative.
The input grid is not modified.

## Common mistakes

- Treating diagonal neighbors as connected changes the problem.
- Marking only when removing from the queue allows duplicate enqueues.
- Resetting `seen` for each starting cell counts the same island repeatedly.

## Language notes

Python uses a set of coordinate tuples and `collections.deque` with `popleft()`.
Java uses a boolean matrix and `ArrayDeque<int[]>`, avoiding boxed coordinate keys.
The Java `countInRow` helper keeps the outer scan small while sharing the same visited matrix across rows.
Both implementations inspect neighbors in the same order, though the island count does not depend on that order.
