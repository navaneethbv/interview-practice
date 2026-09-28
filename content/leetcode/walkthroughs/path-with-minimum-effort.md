## Intuition
A route's effort is its largest height jump, rather than the sum of its jumps.
Dijkstra's algorithm still applies because extending a route cannot reduce this maximum.
The next cell with the smallest known effort can therefore be finalized before cells with larger tentative efforts.

## Brute force
Enumerate all simple routes from the upper-left corner to the lower-right corner and evaluate each route's largest edge.
The number of routes can be exponential in the number of cells.
Revisiting a cell cannot improve a route's maximum, but even restricting to simple routes leaves far too many candidates.

## Approach
1. Store the best known effort for each cell, initially infinity except zero at the start.
2. Push the starting cell with effort zero into a minimum heap.
3. Pop the smallest effort and skip entries that no longer match the cell's recorded best value.
4. Return when the destination is popped with its current best effort.
5. For each valid neighbor, compute the larger of the current effort and the absolute height difference.
6. If this candidate improves the neighbor, update its record and push a new heap entry.

The heap orders complete path costs under the maximum-edge rule.
Any unprocessed route to a popped cell must pass through a frontier entry whose effort is at least the popped minimum.
Continuing that route cannot reduce its effort, which justifies finalization and early return.

## Walkthrough
Example 1 is `[[1,3],[2,4]]`.
Starting at height 1 costs zero.
Moving down to height 2 has effort one; moving right to height 3 has effort two.
The height-2 cell is popped first and proposes the destination with effort `max(1,2) = 2`.
The other route also reaches height 4 with effort two.
When the destination's current entry is popped, the algorithm returns 2.

## Complexity
For V cells, the grid has O(V) neighboring edges.
Heap operations give O(V log(V+1)) time, while the best-effort matrix and queued improvements use O(V) space.
The references do not modify the height matrix.

## Edge cases
A one-cell grid needs no movement and returns zero.
Equal-height paths may have zero effort.
One-row and one-column grids are handled by the same boundary checks.

## Common mistakes
- Adding edge differences solves a different shortest-path problem.
- Ordinary breadth-first search minimizes step count rather than effort.
- Marking a cell final when first inserted can discard a later better route.

## Language notes
Python uses `heapq`; Java uses a `PriorityQueue` ordered by effort.
Both extract neighbor relaxation into a helper and discard stale entries.
The published height range makes absolute differences safe in Java `int`.
