## Intuition

In a DAG, all paths into a node arrive from earlier nodes in a topological order.
Once those predecessors have been processed, their path counts can be safely added and propagated onward.

## Brute force

Enumerating every path can require exponential time even when the graph is small.
Dynamic programming aggregates paths sharing the same destination.

## Approach

Compute every vertex's indegree and enqueue all zero-indegree vertices.
Set `paths[start] = 1` for the empty path and leave every other count zero.
Remove vertices from the queue, adding their count to each outgoing neighbor modulo `MOD`.
Decrement each neighbor's indegree and enqueue it when all predecessors have been processed.
Every path to a neighbor has one final incoming edge, so summing predecessor contributions counts each path once.
Vertices unreachable from start propagate zero.

## Walkthrough

```text
Input: graph = [[1], [], [1], [4], [1, 2, 5], [2]], start = 4
Output: [0, 3, 2, 0, 1, 1]
```

Example 1 starts with one path at node 4.
Its outgoing edges give one path each to nodes 1, 2, and 5.
Node 5 contributes another path to node 2, bringing that count to 2.
Node 2 then contributes two additional paths to node 1, bringing its count to 3.
Nodes 0 and 3 are unreachable from start, so the result is `[0, 3, 2, 0, 1, 1]`.

## Complexity

For V vertices and E edges, time is O(V + E).
Indegrees, counts, and the queue use O(V) extra space.

## Edge cases

The starting vertex counts its empty path even if it has incoming edges from unreachable vertices.
A singleton graph returns `[1]`.
Disconnected regions remain zero in the output.

## Common mistakes

Do not initialize every zero-indegree vertex with one path.
Queueing only start can stall indegree processing when unreachable predecessors exist.

## Language notes

Python uses deque and reduces each addition modulo the constant.
Java accumulates into long entries, then converts the reduced results to ints for the required return type.
