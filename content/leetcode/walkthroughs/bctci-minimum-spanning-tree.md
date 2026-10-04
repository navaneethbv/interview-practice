## Intuition

Build a forest by repeatedly accepting the cheapest edge that connects two different components.
Such an edge links previously disconnected groups without creating a cycle, and the minimum-spanning-tree cut property makes this greedy choice safe.

## Brute force

Enumerate subsets of V minus one edges and check which subsets form spanning trees.
That search is combinatorial in the number of edges and repeats connectivity tests for many unsuitable subsets.

## Approach

Initialize `DisjointSets` with each vertex in its own component.
Sort all edges by weight.
For each `[u, v, weight]`, call `join(u, v)`.
When the representatives differ, union by size merges the components and the edge weight is added to `total`.
When they already agree, reject the edge because it would close a cycle.
The connected-input guarantee ensures that the accepted forest eventually becomes a spanning tree, even though the reference continues scanning remaining edges.

## Walkthrough

Example 1 has edges of weights 2, -1, and 5.
Sorting processes `[1, 2, -1]` first, joining vertices 1 and 2 and setting total to -1.
The weight-two edge joins vertex 0 to that component, making total one.
The weight-five edge now has endpoints in the same component and is rejected.
The result is 1.

## Complexity

Sorting dominates at O(E log E), with O(E alpha(V)) amortized union-find work and O(V) initialization.
Auxiliary space is O(V + E) including sorting storage and the disjoint-set arrays.

## Edge cases

Negative edge weights are valid and naturally sort first.
Equal weights may yield several minimum trees, but only their common minimum cost is requested.

## Common mistakes

Do not accept an edge merely because one endpoint has not appeared before.
Connectivity must be checked between current components, not individual visited flags.

## Language notes

Python sorts a new list of edges.
Java sorts the input outer edge array and accumulates the returned cost in `long`; both helpers apply path compression and union by size.
