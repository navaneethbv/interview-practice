## Intuition

Negative edges prevent ordinary greedy shortest-path assumptions, but acyclicity supplies a stronger ordering guarantee.
When a vertex is processed in topological order, every path that could improve its distance has already reached it through an earlier predecessor.

## Brute force

Enumerate all start-to-goal paths and select the cheapest.
A DAG can have exponentially many paths, so retaining one best distance per vertex avoids an enormous repeated search.

## Approach

Build weighted `adjacency`, then compute a topological order with indegrees.
Initialize `distance[start]` to zero and other distances as unreachable.
For every reachable node in that order, relax each outgoing edge.
Whenever a distance improves, record the predecessor in `previous`.
If the goal remains unreachable, return an empty list.
Otherwise follow predecessor pointers backward from goal to start and reverse the collected path.
Strict improvements are sufficient because any shortest path is accepted.

## Walkthrough

Example 1 starts at 4 and targets 1.
Direct edges give distances 11 to 1, 21 to 2, and 14 to 5.
The edge from 5 to 2 has weight -30, improving vertex 2 to -16.
Its edge to 1 then improves that distance to -6.
Following predecessors gives `1, 2, 5, 4`, reversed into `[4, 5, 2, 1]`.

## Complexity

Time and auxiliary space are O(V + E), including the constructed adjacency lists and topological order.
The reconstructed path contains at most V vertices because the graph is acyclic.

## Edge cases

An unreachable goal yields `[]`.
When start equals goal, the empty-edge path is represented by `[start]`.
Negative weights need no special case in topological relaxation.

## Common mistakes

Do not run breadth-first search for weighted distances or stop when first discovering the goal.
Never relax from an unreachable sentinel.

## Language notes

Python represents unreachable distances with `None`.
Java uses `Long.MAX_VALUE`, skips those entries before addition, and stores path totals in `long` to protect accumulated weights.
