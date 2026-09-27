## Intuition

Initially every vertex is an isolated component.
An edge either joins two different components or adds another connection inside one existing component.
Only the first case reduces the component count, so connectivity can be maintained incrementally.

## Brute force

After each new edge, rebuild the graph and recount components with a traversal.
That repeatedly revisits old connections, potentially taking O(E(n + E)) time.
Union-find remembers the current partition without retaining adjacency lists.

## Approach

1. Use disjoint sets with one `parent` and `size` entry per vertex, and initialize `components = n`.
2. Find the roots of an edge's two endpoints using path halving.
3. If both roots match, no component merge is needed.
4. Otherwise attach the smaller rooted tree to the larger, update the surviving size, and decrement `components`.
5. Return the final count.

Two vertices share a root exactly when the processed edges connect them.
Path halving changes the parent links used to represent a component but does not change component membership.
The size heuristic prevents repeated merges from building unnecessarily deep trees.

## Walkthrough

Example 1 uses n equal to 5 and edges `[[0, 1], [1, 2], [3, 4]]`.

| Edge processed | Component groups | `components` |
| --- | --- | --- |
| None | `{0}`, `{1}`, `{2}`, `{3}`, `{4}` | 5 |
| 0, 1 | `{0,1}`, `{2}`, `{3}`, `{4}` | 4 |
| 1, 2 | `{0,1,2}`, `{3}`, `{4}` | 3 |
| 3, 4 | `{0,1,2}`, `{3,4}` | 2 |

Return 2 because no processed edge connects the two remaining groups.
The actual root label of a group is an implementation detail, not its component count.

## Complexity

- Time: O(n + E α(n)) amortized, using union by size and path compression for E edges.
- Space: O(n), for parent and size storage.

## Edge cases

With no edges, the answer is n because every vertex is isolated.
A connected graph has one component even if it contains cycles.
An edge whose endpoints already share a root leaves the answer unchanged.
Vertices absent from the edge list still contribute components.

## Common mistakes

- Counting only vertices present in edges loses isolated vertices.
- Subtracting one per edge fails when cycles provide redundant connections.
- Counting distinct raw parent entries without finding roots can overcount a component.

## Language notes

Python and Java use the same iterative root-finding and weighted-union logic.
Their arrays are indexed by the vertex labels supplied in the statement.
Neither version needs a set of every component's members, which would make repeated unions more expensive.
