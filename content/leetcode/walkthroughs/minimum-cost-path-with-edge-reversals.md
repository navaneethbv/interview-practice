## Intuition
Each directed edge can be traversed forward at its given cost or backward by paying twice that cost.
Representing both choices as directed weighted edges turns the problem into a standard nonnegative shortest-path search.

## Brute force
Enumerating all paths and their reversal choices can be exponential and may revisit cycles.
Dijkstra's algorithm keeps the cheapest known cost for every node and ignores dominated paths.

## Approach
1. Add `(v,w)` for every original edge `u -> v`.
2. Add `(u,2w)` to represent reversing that edge.
3. Run Dijkstra from node 0 with a min-heap of `(cost,node)` states.
4. Skip stale states and return when node `n - 1` is removed with its current best distance.

## Walkthrough
Example 1 has edges `0 -> 1` cost 4 and `2 -> 1` cost 3.
From node 0, the forward edge reaches node 1 with cost 4.
Traversing the second edge backward reaches node 2 at an additional cost 6, for total 10.
The destination node 2 is then removed from the heap with cost 10, so the answer is 10.

## Complexity
The expanded graph has N vertices and at most twice the input edge count.
Dijkstra runs in O((N + E) log N) time with a binary heap and O(N + E) graph plus heap space.

## Edge cases
If no expanded path reaches the destination, return -1.
A direct forward edge is always cheaper than reversing that same edge when its weight is positive.
Multiple edges and cycles are handled by the distance relaxation rule.

## Common mistakes
Adding a reverse edge with cost w instead of 2w changes the problem.
Marking nodes permanently when first inserted rather than when popped can discard a cheaper path.
Forgetting stale heap checks can repeat unnecessary work and use outdated costs.

## Language notes
Python stores adjacency pairs in lists and uses `heapq` tuples.
Java uses `ArrayList<int[]>`, an integer distance array, and a `PriorityQueue<int[]>` ordered by cost.
