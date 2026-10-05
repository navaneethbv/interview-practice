## Intuition

A directed acyclic graph has an ordering in which every edge goes forward.
When processing a vertex in that order, all predecessors have already supplied their best possible path totals.

## Brute force

Enumerating every path can take exponential time, even in a DAG.
A greedy shortest path algorithm does not solve this maximum weight problem, particularly with negative edge weights.

## Approach

Build `adjacency` and obtain a topological `order` using indegrees and a queue.
Set `best[start]` to zero and all other entries to `SENTINEL`.
For each reachable node, maximize each neighbor's total with `best[node] + w`.

## Walkthrough

Example 1 starts at 4, giving node 1 total 11, node 2 total 21, and node 5 total 14.
The route through 5 offers -16 to node 2, so 21 remains.
Node 2 then improves node 1 to 31.
Nodes 0 and 3 remain unreachable.

## Complexity

Building adjacency, topologically ordering vertices, and relaxing edges take O(V + E) time.
Adjacency requires O(V + E) space; indegrees, the queue, order, and `best` each need at most O(V).

## Edge cases

An isolated starting vertex has distance zero to itself.
Reachable totals may be negative and must not be replaced by zero.
Unreachable vertices retain exactly -2147483648, as required by the local contract.

## Common mistakes

Skip sentinel entries before adding edge weights.
Processing only vertices with no outgoing edges would reverse the required dependency order.
Do not overwrite a better total merely because another valid route reaches the same neighbor.

## Language notes

Python's `_order` returns a complete vertex list using `deque`.
Java builds the equivalent list with `ArrayDeque`.
The allowed path lengths fit Java `int` because a DAG path has fewer than V edges, each of magnitude at most 10,000.
