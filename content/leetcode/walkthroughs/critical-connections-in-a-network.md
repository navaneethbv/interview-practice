## Intuition

An edge is critical when its child side has no route back to the parent side without using that edge.
Tarjan's low-link values record the earliest discovery time reachable from a subtree, and the iterative reference computes them without recursion depth risk.

## Brute force

Removing each edge and running a connectivity search costs O(e(n+e)) in the worst case.
That repeats nearly the whole graph traversal for every candidate edge.

## Approach

1. Build an undirected adjacency list and assign discovery times while walking from node 0.
2. Maintain `low[node]`, the smallest discovery time reachable from the node's subtree using zero or more tree edges and at most one back edge.
3. Finish a node only after its neighbors are exhausted, then propagate its low value to its parent.
4. If `low[child] > discovery[parent]`, record the parent-child edge as a bridge.

## Walkthrough

For Example 1, edges `0-1`, `1-2`, `2-0`, and `1-3`, discovery follows 0, then 1, then 2.
The edge from 2 back to 0 lowers `low[2]` and then `low[1]` to discovery time 0, so the triangle edges have alternate routes.
The traversal then visits 3 from 1, and node 3 has no back edge, leaving `low[3]` greater than `discovery[1]`.
The edge `[1,3]` is therefore recorded as the only critical connection.

## Complexity

Each adjacency entry is examined once, so the iterative traversal takes O(n + e) time.
The adjacency lists and discovery arrays use O(n + e) space, and the bridge output is additional result storage.

## Edge cases

The statement guarantees a connected graph, so starting at node 0 reaches every server.
A cycle lowers low-link values and prevents its edges from being reported.
The explicit stack supports a path with 100,000 nodes without Python or Java recursion overflow.

## Common mistakes

Skip only the parent edge, because treating it as a back edge would incorrectly lower `low`.
Test the strict inequality `low[child] > discovery[parent]`; equality means an alternate route reaches the parent itself.
Propagate a finished child's low value after processing all descendants.

## Language notes

Python stores iterators on its explicit stack, while Java stores a per-node adjacency cursor.
Both implementations avoid recursive helper calls and return endpoint order accepted by the spec.
