## Intuition

An undirected graph is a tree exactly when it is connected and has n minus one edges.
A disjoint-set structure tracks connectivity as edges arrive.
Combining those two checks avoids separately traversing the graph to detect cycles.

## Brute force

Check connectivity from every vertex and separately test edge removals to look for cycles.
Those repeated traversals do much more work than necessary.
A single graph traversal is also linear, but union-find is convenient when the input is already an edge list.

## Approach

1. Initialize each vertex as its own component with `parent[vertex] = vertex` and `size[vertex] = 1`.
2. For each edge, find both endpoint roots using path halving.
3. If the roots differ, attach the smaller component beneath the larger and decrement `components`.
4. If the roots match, leave the component count unchanged.
5. Return true only when `components == 1` and the edge count equals n minus one.

A connected undirected graph needs at least n minus one edges.
Having exactly that many leaves no extra edge to form a cycle.
Union by size and path halving keep root lookups efficient without altering the connectivity result.

## Walkthrough

Example 1 has n equal to 4 and edges `[[0, 1], [1, 2], [1, 3]]`.

| Edge | Components after union | `components` |
| --- | --- | --- |
| Initially | `{0}`, `{1}`, `{2}`, `{3}` | 4 |
| 0, 1 | `{0,1}`, `{2}`, `{3}` | 3 |
| 1, 2 | `{0,1,2}`, `{3}` | 2 |
| 1, 3 | `{0,1,2,3}` | 1 |

There is one component and three edges, matching n minus one.
Return true.

## Complexity

- Time: O(n + E α(n)) amortized for E edges, using union by size and path compression; α grows extremely slowly.
- Space: O(n), for the parent and component-size arrays.

## Edge cases

One vertex with no edges is a tree.
Multiple isolated vertices fail connectivity.
A connected cycle fails the edge-count check even though it has one component.
The input contract excludes duplicate undirected edges and self-loops.

## Common mistakes

- Checking only n minus one edges can accept a disconnected graph containing a cycle.
- Decrementing the count for an edge within one component undercounts components.
- Linking arbitrary vertices instead of component roots corrupts the union structure.

## Language notes

Both references use iterative root finding, avoiding recursion on parent chains.
Python returns a boolean from `_unite`; Java does the same from `unite`.
The caller decrements `components` only when that result indicates a real merge.
