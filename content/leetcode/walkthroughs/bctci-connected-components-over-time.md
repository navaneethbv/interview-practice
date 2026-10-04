## Intuition

As time increases, edges are only added, so components can merge but never split.
A disjoint-set structure can preserve connectivity between queries instead of rebuilding the graph repeatedly.

## Brute force

Running a complete graph traversal for every timestamp would repeat nearly all earlier work.
Sorting edges once lets each edge be incorporated only when it first becomes available.

## Approach

Initialize `DisjointSets` with V singleton groups.
Sort edges by timestamp and keep a `position` pointer into that order.
For each already-sorted query time, join every edge with timestamp at most the query, then append `sets.groups`.
`join` finds both roots and decrements groups only when they differ.
Union by size and path compression keep future root lookups efficient.
After processing a query, the structure contains exactly the edges available at that time.

## Walkthrough

```text
Input: [3, [[0, 1, 2], [1, 2, 4]], [1, 2, 4]]
Output: [3, 2, 1]
```

Example 1 starts with three isolated vertices.
At time 1, neither edge is available, so record 3.
At time 2, joining 0 and 1 reduces the component count to 2.
At time 4, joining 1 and 2 connects the remaining vertex, reducing it to 1.
The returned sequence is `[3, 2, 1]`.

## Complexity

For E edges and Q queries, time is O(E log E + E alpha(V) + V + Q).
Here alpha is the inverse Ackermann function from disjoint-set operations.
Stored edge order, component arrays, and output use O(E + V + Q) space.

## Edge cases

Repeated query times return the same count.
Cycle-closing edges do not reduce groups.
A single vertex always has one component.

## Common mistakes

Use `<=` for equal timestamps.
Do not decrement groups for an edge whose endpoints already share a root.

## Language notes

Python sorts into a new list.
Java sorts the supplied edge array in place, a mutation difference that does not change returned answers.
