## Intuition

Every legal move has cost one, so breadth-first search reaches cells in nondecreasing distance order.
The first food cell removed from `pending` therefore has the shortest path length from `*`.
Marking a cell in `seen` when enqueuing prevents duplicate paths from expanding it again.

## Brute force

Depth-first search can find a route, but it may follow a long route before discovering a short one and needs a best-distance comparison.
Enumerating all paths is exponential because each open cell can branch in several directions.

## Approach

1. Find the `start` cell and enqueue it with distance zero.
2. Repeatedly remove the oldest `(row, column, distance)` tuple.
3. Return `distance` when the cell is `#`.
4. For each edge neighbor, require bounds, a non-wall value, and absence from `seen`.
5. Mark and enqueue each accepted neighbor with distance plus one, returning -1 if the queue empties.

## Walkthrough

Example 1 is `[["*", "O", "#"]]`.

| queue item | neighbors added | result |
| --- | --- | --- |
| `(0, 0, 0)` | `(0, 1, 1)` | continue |
| `(0, 1, 1)` | `(0, 2, 2)` | continue |
| `(0, 2, 2)` | none | return 2 at `#` |

## Complexity

- Time: O(rows * columns), because each reachable cell is enqueued once and checks four neighbors.
- Space: O(rows * columns), for `pending` and `seen` in the worst case.

## Edge cases

Food adjacent to the start is returned with distance one.
Walls block movement but do not need to be copied or mutated.
An unreachable food cell leaves the queue empty and returns -1.
The input has one start, but the Java scan still records any encountered start safely.

## Common mistakes

- Using a stack gives a traversal order rather than a shortest-path guarantee.
- Marking cells when dequeued permits duplicate queue entries.
- Allowing diagonal moves changes the problem's edge-adjacent movement rule.

## Language notes

Python uses `collections.deque` for O(1) left removal.
Java uses `ArrayDeque<int[]>` and separate row and column direction arrays.
The helper `addReachableNeighbors` keeps the Java BFS loop focused on distance handling.
