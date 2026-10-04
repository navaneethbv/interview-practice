## Intuition

Computing a shortest distance also reveals the final edge of a shortest path.
Remember that predecessor whenever a relaxation improves a vertex, then follow predecessor links backward from the goal.

## Brute force

Enumerating every start-to-goal path is exponential.
Storing a full path for every distance update also copies many shared prefixes unnecessarily.

## Approach

Build weighted adjacency and a topological order.
Initialize only start as reachable with distance zero.
For each reachable node, relax outgoing edges; on improvement, update both `distance[v]` and `previous[v]`.
After all relaxations, return an empty list if goal is unreachable.
Otherwise begin at goal and follow previous until reaching start, then reverse the accumulated list.
Every stored predecessor realizes the associated distance, so the reconstructed chain has the optimal total weight.

## Walkthrough

```text
Input: V = 6, edges = [[0, 1, 10], [2, 1, 10], [3, 4, 12], [4, 1, 11], [4, 2, 21], [4, 5, 14], [5, 2, -30]], start = 4, goal = 1
Output: [4, 5, 2, 1]
```

Example 1 first reaches node 1 directly from 4 with cost 11.
The route through 5 improves node 2 to cost 14 - 30 = -16.
Node 2 then improves node 1 to -6 and becomes its predecessor.
Following predecessors backward gives 1, 2, 5, 4.
Reversal produces `[4, 5, 2, 1]`, the stated shortest path.

## Complexity

Topological sorting and relaxation take O(V + E) time.
Reconstruction adds O(V) time in the worst case.
Adjacency and state arrays use O(V + E) space, including the returned path bound.

## Edge cases

If start equals goal, the result is the singleton start path.
Negative edges are supported.
Equal shortest alternatives need no particular tie-breaking rule.

## Common mistakes

Updating a distance without its predecessor produces an inconsistent route.
Do not begin reconstruction before checking reachability.

## Language notes

Python uses None for unknown distances and predecessors.
Java uses `Long.MAX_VALUE` for unreachable distances and long arithmetic for path sums; both reverse the backward node sequence.
