## Intuition

Every cell of the first island is a possible starting point for the bridge.
A breadth-first search launched from all those cells expands through water in increasing numbers of required flips.
The first encounter with the other island therefore gives the minimum bridge length.

## Brute force

One can compare every cell in the first island with every cell in the second and minimize their Manhattan distance minus one.
For an n-by-n grid, the two island sizes can each be proportional to n², producing O(n⁴) pair comparisons.
Multi-source BFS explores the grid once instead.

## Approach

1. Find the first land cell in row-major order.
2. Collect its entire island using an iterative traversal and mark those positions as seen.
3. Initialize a queue containing every first-island cell with distance zero.
4. Remove cells in FIFO order and examine their four edge neighbors.
5. Skip seen positions; return the current distance when an unseen neighbor is land.
6. Otherwise mark the water neighbor seen and enqueue it with distance plus one.

The distance counts water already crossed, so stepping onto the second island does not add a flip.

## Walkthrough

Example 1 is `grid = [[0,1],[1,0]]`.
The first island contains only `(0,1)`, queued with distance zero.
Its valid water neighbors `(1,1)` and `(0,0)` enter the queue with distance one.
When a distance-one cell is processed, it touches the unvisited land at `(1,0)`.
The search returns one: changing either water cell connects both islands.
The diagonal land cells were separate islands because island connectivity uses edges only.

## Complexity

- Time: O(n²), since each grid position is discovered at most once during each of the two bounded traversals.
- Space: O(n²), for the visited structure, first-island collection, and search queue.

## Edge cases

An island may contain many cells, all of which must start at distance zero.
A narrow or winding island is collected without recursion.
Grid edges restrict the available neighbors.
The problem guarantees exactly two islands, so an answer exists and no empty-grid case is required.
Neither reference changes the grid values.

## Common mistakes

- Starting from only one first-island cell can charge extra travel within existing land.
- Adding one when reaching the second island counts an unnecessary flip.
- Allowing diagonal neighbors changes the island definition.

## Language notes

Python uses coordinate sets and `deque`; Java uses a boolean matrix and `ArrayDeque`.
Their initial island traversals use different discovery orders, but all island seeds have equal distance and produce the same minimum.
