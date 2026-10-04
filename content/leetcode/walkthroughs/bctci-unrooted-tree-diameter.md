## Intuition

In a tree, a vertex farthest from any starting vertex is an endpoint of a diameter.
A second search from that endpoint reaches the opposite endpoint and measures the maximum path length.

## Brute force

Running a graph search from every vertex costs O(n squared) time.
The tree's unique-path structure makes two breadth-first searches sufficient.

## Approach

Build an undirected adjacency list from the n - 1 edges.
Run `farthest` from vertex zero, assigning distances with BFS and retaining the final dequeued vertex.
FIFO processing visits vertices in nondecreasing distance, so that final vertex is farthest.
Run the same search from it and return the farthest distance from the second pass.
The first pass selects a peripheral endpoint; unique tree paths ensure its maximum-distance partner realizes a diameter.
No rooting convention or node values are needed.

## Walkthrough

```text
Input: [4, [[0, 1], [1, 2], [1, 3]]]
Output: 2
```

Example 1 starts at vertex 0.
Its distances are zero to itself, one to vertex 1, and two to vertices 2 and 3.
Either 2 or 3 can serve as the first farthest endpoint.
Starting from 3, for example, vertices 0 and 2 are both distance two away.
The second search therefore returns diameter 2 edges.

## Complexity

Building adjacency and performing two searches takes O(n) time because a tree has n - 1 edges.
Adjacency, distances, and the queue require O(n) space.

## Edge cases

A singleton has diameter zero.
A path-shaped tree has diameter n - 1.
Several equally distant vertices may exist; any first-pass farthest vertex works for an unweighted tree.

## Common mistakes

Do not return the number of vertices along the route instead of edges.
The two-search theorem should not be assumed for arbitrary cyclic graphs.

## Language notes

Python factors BFS into a helper returning endpoint and distance.
Java performs two passes in one method, reinitializing distances and the queue before each search.
