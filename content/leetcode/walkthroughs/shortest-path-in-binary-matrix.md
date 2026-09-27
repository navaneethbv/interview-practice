## Intuition

Every move has equal cost, so breadth first search discovers cells in increasing path length.
The eight neighboring directions include diagonals, and the first time the destination leaves the queue its distance is shortest.
Marking a cell when it is enqueued prevents duplicate work.

## Brute force

Enumerating every possible path can revisit the same cell through many route prefixes and grows exponentially.
A depth first search could find a route, but it would need extra logic to prove that no shorter route exists.
BFS gives the shortest path directly because every edge has unit cost.

## Approach

1. Return -1 if either endpoint is blocked.
2. Enqueue the start cell with distance one and mark it seen.
3. Remove one cell and return its distance when it is the destination.
4. Generate every in-bounds open neighbor across eight directions.
5. Enqueue unseen neighbors with distance plus one.
6. Return -1 if the queue empties first.

## Walkthrough

Example 1 uses grid = [[0,1],[1,0]].

| queue event | cell | distance | new cells |
| --- | --- | ---: | --- |
| start | (0,0) | 1 | diagonal (1,1) |
| pop destination | (1,1) | 2 | none |

The diagonal move reaches the bottom-right cell in two cells, so the answer is 2.

## Complexity

Let n be the grid side length.
Each cell is enqueued at most once and checks at most eight neighbors, giving O(n²) time.
The seen matrix or coordinate set and BFS queue use O(n²) auxiliary space.
The returned distance is a scalar.

## Edge cases

A one-cell open grid returns one.
A blocked start or destination returns -1 immediately.
A path may use diagonal movement even when horizontal and vertical neighbors are blocked.
An isolated open destination remains unreachable.

## Common mistakes

- Returning the number of moves instead of cells makes every answer one too small.
- Checking only four directions misses legal diagonal paths.
- Marking on dequeue allows duplicate queue entries.
- Using DFS without distance tracking does not guarantee a shortest route.

## Language notes

Python stores row, column, and distance tuples in deque.
Java stores the same fields in int arrays and uses a boolean matrix for seen.
Both generate neighbors from the current cell without copying the grid.
