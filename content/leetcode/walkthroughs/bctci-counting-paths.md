## Intuition

In a directed acyclic graph, every predecessor can be processed before the node it contributes to.
This allows path counts to flow forward once, adding the number of ways to reach a predecessor for each outgoing edge.

## Brute force

A traversal that explicitly enumerates complete paths may take exponential time because a DAG can contain exponentially many distinct paths.
Counting contributions reuses work when many paths arrive at the same vertex.

## Approach

Compute every vertex's `indegree` and enqueue all vertices with zero indegree.
Set `paths[start] = 1` for the empty path and leave other counts zero.
When removing a `node`, add `paths[node]` to each neighbor's count modulo `MOD`.
Decrease that neighbor's indegree and enqueue it only when all incoming edges have been processed.
Processing the entire graph ensures that unreachable predecessors also release their indegree contributions without inventing paths.

## Walkthrough

In Example 1, start is 4.
After vertex 3 releases 4, vertex 4 contributes one path to vertices 1, 2, and 5.
Vertex 5 adds another path to 2, making `paths[2] = 2`.
Vertex 2 then contributes those two paths to 1, whose direct path from 4 already contributed one.
The result is `[0, 3, 2, 0, 1, 1]`.

## Complexity

For V vertices and E edges, time is O(V + E).
Indegrees, counts, and the queue use O(V) auxiliary space beyond the input graph.

## Edge cases

A graph consisting only of the start returns `[1]`.
Unreachable vertices keep zero counts.
The start may itself have incoming edges from unreachable vertices without changing its empty-path count.

## Common mistakes

A visited flag is insufficient for path counting because multiple predecessors must contribute.
Do not process a node before all its incoming edges have been released.

## Language notes

Python uses `deque` for efficient queue removal.
Java uses long-valued counts during modular addition and converts the final reduced entries into the required integer array.
