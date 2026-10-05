## Intuition

Kruskal's algorithm naturally produces a minimum spanning tree while recording the accepted edges.
Here the output must also be reproducible, so equal weights follow original input order and selected edges retain their given endpoint orientation.

## Brute force

Enumerate all candidate edge subsets, check connectivity and cycles, then choose a cheapest tree.
Besides combinatorial cost, this requires additional logic to reproduce the exact tie rule specified by the problem.

## Approach

Initialize `DisjointSets` and an empty `answer` list.
Stably sort edges by weight, then call `join` on each edge's endpoints.
Append the edge only when it merges different components.
Union by size and path compression keep connectivity checks efficient.
At the end, return the accepted edges only if at most one component remains.
Otherwise discard the partial forest and return an empty list because no spanning tree exists.

## Walkthrough

Example 1 orders its edges by weights one, two, and four.
The edge `[0, 2, 1]` first joins vertices 0 and 2.
The edge `[1, 2, 2]` connects vertex 1 to them.
The weight-four edge has endpoints already connected, so it is skipped.
All vertices now belong to one component and the output is `[[0, 2, 1], [1, 2, 2]]`.

## Complexity

Sorting takes O(E log E) time, followed by O(E alpha(V)) amortized union-find work.
Auxiliary storage is O(V + E), including sorting space and selected edges.

## Edge cases

Zero or one vertex returns an empty tree.
Disconnected input returns `[]`, even if some edges were accepted.
Negative weights and equal weights are handled by the same ordering rule.

## Common mistakes

Do not reorder endpoints or sort selected edges again after selection.
An unstable tie sort can produce a different tree than the required deterministic answer.

## Language notes

Python's `sorted` is stable and creates a new edge list.
Java's object-array sort is also stable, but sorts the supplied outer array and appends its edge arrays directly to the result.
