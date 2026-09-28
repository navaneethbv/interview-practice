## Intuition

In an undirected graph, a path exists exactly when source and destination belong to the same connected component.
Disjoint set union joins each edge's endpoints and compares their final roots.

## Brute force

A breadth-first or depth-first search from source works for one query but stores and explores graph adjacency.
Union find directly records component connectivity as edges arrive.

## Approach

1. Initialize each vertex as its own parent.
2. For every edge, find both roots and attach one root to the other.
3. Compare the roots of source and destination after all unions.
4. Path compression shortens future root searches.

## Walkthrough

For Example 1, edge `[0,1]` joins components 0 and 1.
Edge `[1,2]` finds root 0 for vertex 1 and joins vertex 2 to that same component.
Source 0 and destination 2 therefore have equal roots, so the result is true.

## Complexity

For n vertices and e edges, union find costs O((n + e) alpha(n)) amortized time and O(n) parent space.
The references do not build an adjacency list.

## Edge cases

When source equals destination, both roots are equal even with no edges.
An empty edge list leaves distinct vertices disconnected.
Repeated edges are harmless because unioning equal roots changes nothing.

## Common mistakes

Compare roots after path compression, not raw parent entries.
Treat edges as undirected by joining both endpoints.
Do not return false merely because source has no outgoing edge when it equals destination.

## Language notes

Python's `_find` uses path halving in the parent list.
Java uses the same iterative compression with an `int[]` parent array.
