## Intuition

For any proposed meeting vertex, each friend can independently take a shortest path there.
The total cost is therefore the sum of three shortest-path distances, and the best meeting location minimizes that sum across all vertices.

## Brute force

Run a shortest-path search separately for every possible meeting node.
That would require O(V times (V + E)) work, even though there are only three fixed starting locations whose distances matter.

## Approach

Initialize `totals` to zero for every node.
Run `_distances` once from each of `node1`, `node2`, and `node3`.
Each search uses breadth-first traversal, marking distance when a neighbor is first enqueued.
Add its distance array into `totals`, then return the minimum accumulated total.
Unweighted edges make the first BFS discovery shortest, and the connected-graph guarantee ensures every distance is available for every proposed meeting location.

## Walkthrough

Example 1 is a five-node cycle with starts 0, 2, and 4.
Distances from 0 are `[0, 1, 2, 2, 1]`.
Distances from 2 are `[2, 1, 0, 1, 2]`.
Distances from 4 are `[1, 2, 2, 1, 0]`.
Adding gives `[3, 4, 4, 4, 3]`.
Meeting at 0 or 4 costs three total edge traversals, so the output is 3.

## Complexity

Three BFS runs take O(V + E) time overall because three is constant.
Distances, totals, and the queue use O(V) auxiliary space beyond the input adjacency list.

## Edge cases

All friends may start at the same node, giving zero cost.
A single-node graph also returns zero.
The graph need not be a tree and may contain cycles.

## Common mistakes

Count each friend's travel separately even when their routes share edges.
Do not minimize the largest individual distance, which optimizes a different objective.

## Language notes

Python uses `deque.popleft` and Java uses queue operations on `ArrayDeque`.
Both initialize distances to -1 so visited state and shortest distance share one array.
