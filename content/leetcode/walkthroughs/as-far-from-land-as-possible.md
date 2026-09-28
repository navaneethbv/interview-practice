## Intuition

The nearest land distance for every water cell is found by expanding outward from all land cells simultaneously.
Multi-source breadth-first search labels each layer with one greater Manhattan distance, so the last water layer is the farthest one.

## Brute force

Running a BFS from every water cell repeats nearly the same paths and can cost O(n^4).
Starting all land cells together visits each cell once.

## Approach

1. Put every land cell in the queue and mark it seen.
2. Process the queue layer by layer, adding unseen four-direction neighbors.
3. Increase `distance` once per completed layer.
4. Return -1 when the grid has no land or no water.

## Walkthrough

For Example 1, land occupies all four corners of the 3 by 3 grid.
The center cell is reached after two four-direction steps from any corner, while edge water cells are reached after one.
The final water layer is therefore distance 2, so the result is 2.

## Complexity

For an n by n grid, each cell enters the queue at most once, giving O(n²) time.
Python uses a set of coordinate tuples and a deque, while Java uses a boolean matrix and an `ArrayDeque`.
Both use O(n²) auxiliary space in the worst case.

## Edge cases

All land and all water return -1 because no land-water distance exists.
A single water cell next to land returns 1.
Neighbors are limited to the four cardinal directions.

## Common mistakes

Do not start BFS from only one land cell.
Increment distance per layer, not per cell.
Mark a cell when enqueuing so it cannot enter twice.

## Language notes

Python's `_seed_land` and `_expand_layer` helpers keep queue setup separate from expansion.
Java uses an explicit layer size so newly enqueued cells wait for the next distance.
