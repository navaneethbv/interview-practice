## Intuition

Kruskal's algorithm identifies a minimum spanning tree by accepting cheap edges that connect separate components.
Here the actual accepted edges matter, so equal-weight processing order must also be reproducible.
Stable sorting preserves the original input order among those ties.

## Brute force

Enumerate spanning-tree candidates, compare their costs, then resolve the requested deterministic selection behavior.
This is exponential and obscures the explicitly specified greedy processing contract.

## Approach

Create a disjoint-set structure containing all V vertices.
Sort edges by increasing weight using a stable sort.
For each edge, call `join` on its endpoints and append the original edge when the merge succeeds.
The helper uses path halving and union by size to keep representative searches efficient.
A failed merge means that edge would create a cycle, so skip it.
After processing, return the selected sequence only if at most one component remains.
Otherwise the graph is disconnected and has no spanning tree, so discard the partial forest and return an empty list.

## Walkthrough

Example 1 contains edges of weights 4, 1, and 2.
Processing weight 1 first accepts `[0, 2, 1]`.
Processing weight 2 next accepts `[1, 2, 2]`, connecting the remaining vertex.
The weight-4 edge now connects two vertices already in the same component and is skipped.
The answer contains the two selected edges in exactly that processing order, preserving their endpoint order.

## Complexity

For E edges and V vertices, runtime is O(E log E + E alpha(V)).
Union-find uses O(V) space, sorting can use O(E), and the successful output contains at most V minus one edges.

## Edge cases

Zero or one vertex returns an empty list by contract.
Disconnected input also returns an empty list, even if some useful edges were selected.

## Common mistakes

Do not reorder endpoints or sort the selected output again.
An unstable sort can violate the equal-weight input-order rule.

## Language notes

Python's `sorted` is stable and creates another edge list.
Java's object-array sort is stable and sorts the provided outer array; accepted edge arrays are reused in the output.
