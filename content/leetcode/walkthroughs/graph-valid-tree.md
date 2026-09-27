## Intuition

An undirected graph is a tree exactly when it is connected and has n minus one edges.
Check the edge count first, then visit every vertex reachable from vertex zero.
Reaching all vertices proves connectivity, and the edge count then rules out a cycle.

## Brute force

Run a connectivity search from every vertex and independently try removing edges to test for cycles.
Repeated full traversals can cost O(n(n + E)) time even for just the connectivity checks.
One traversal, combined with the tree edge-count property, avoids this repeated work.

## Approach

1. Use iterative depth-first search, first rejecting any graph whose edge count differs from n minus one.
2. Build `neighbors`, adding both directions for every undirected edge.
3. Mark vertex zero in `seen` and put it in the `pending` stack.
4. Pop a vertex and examine each neighbor.
5. Mark and push only neighbors not previously seen.
6. Return true if every vertex was reached.

A connected undirected graph needs at least n minus one edges to connect its vertices.
If it also contained a cycle, removing a cycle edge would leave it connected with fewer than that many edges, a contradiction.
This proves why no separate cycle detector is needed after the edge-count check.
Marking on insertion prevents the two directions of an edge from repeatedly scheduling the same vertex.

## Walkthrough

Example 1 has `n = 4` and edges `[[0, 1], [1, 2], [1, 3]]`.
The three edges pass the required edge count.

| Popped vertex | Newly reached vertices | `pending` afterward | Reached count |
| --- | --- | --- | --- |
| 0 | 1 | `[1]` | 2 |
| 1 | 2, 3 | `[2, 3]` | 4 |
| 3 | None | `[2]` | 4 |
| 2 | None | `[]` | 4 |

Vertex zero was marked before the loop.
All four vertices are reached, so the result is true.

## Complexity

- Time: O(n + E) when the edge count passes, which is O(n) because E = n - 1; an incorrect edge count returns immediately.
- Space: O(n + E), for the adjacency lists, visited state, and stack, also O(n) after the edge-count check.

## Edge cases

One vertex with no edges is a tree.
Multiple isolated vertices fail the edge-count check.
A disconnected graph can have exactly n minus one edges if one component contains a cycle; the traversal correctly rejects it.
The input excludes duplicate edges and self-loops.

## Common mistakes

- Checking only the edge count can accept a disconnected graph containing a cycle.
- Adding only one direction makes reachability depend on the order of edge endpoints.
- Marking vertices too late can schedule the same vertex repeatedly.

## Language notes

Python uses a set for `seen` and returns its size comparison.
Java uses a boolean array and an explicit `reached` counter; its `adjacency` helper builds the same neighbor lists.
Both traverse iteratively and preserve the input edge collection.
