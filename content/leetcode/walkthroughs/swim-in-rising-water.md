## Intuition

For a path, the required water level is the largest grid value encountered on that path.
Treat that required level as the path cost and use a min heap to expand the cheapest frontier.
The first time the destination is removed, no other path can reach it at a lower level.

## Brute force

Enumerating all paths can branch up to four ways at each of the n² cells, giving exponential time.
A binary search over water levels with a grid reachability check is polynomial, while the heap search used here finds the minimum bottleneck in O(n² log n).
## Approach

1. Push the top-left cell with its own elevation as water_level.
2. Pop the frontier cell with the smallest required level.
3. Ignore it if already visited, otherwise mark it visited.
4. Return its level when it is the bottom-right cell.
5. Push each unvisited neighbor with the maximum of the current level and its elevation.

The heap key is a bottleneck value rather than a sum.
A neighbor can be entered later with a higher key, but the visited check keeps only the first cheapest removal.

## Walkthrough

Example 1 uses grid = [[0, 2], [1, 3]].

| heap choice | water_level | next entries |
| --- | ---: | --- |
| (0, 0) | 0 | (1, 0) with 1, (0, 1) with 2 |
| (1, 0) | 1 | (1, 1) with 3 |
| (0, 1) | 2 | destination remains at 3 |
| (1, 1) | 3 | return 3 |

The destination itself has elevation 3, so every path needs at least level 3.

## Complexity

For an n by n grid, each cell is visited once and each heap operation costs O(log(n²)).
The time is O(n² log n), and the heap plus visited matrix use O(n²) auxiliary space.

## Edge cases

A one-cell grid returns its own elevation.
The start cell contributes to the required level.
Multiple frontier routes can reach a cell, but the smallest bottleneck wins.
All elevations are considered through max, even when the path descends afterward.

## Common mistakes

- Summing elevations solves a different path problem.
- Returning when a cell is pushed can accept a nonoptimal route.
- Marking visited when pushed can discard a cheaper future entry.
- Forgetting the start elevation underestimates the required water level.

## Language notes

Python uses heapq tuples containing level, row, and column.
Java uses PriorityQueue and a boolean matrix for the same state.
Both compute the neighbor key with max of the current level and grid elevation.
