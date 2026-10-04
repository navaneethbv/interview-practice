## Intuition

As edges arrive, connected groups merge and their sizes add.
The largest component size can therefore be maintained incrementally alongside disjoint-set connectivity.

## Brute force

Traversing the graph from scratch for every query repeats work on all previously available edges.
Nondecreasing query times allow one forward scan through timestamp-sorted edges.

## Approach

Initialize each vertex with size one and `largest = 1`.
Sort edges by time and keep a position pointer.
Before answering a query, join every edge whose timestamp is at most that query.
A successful join attaches the smaller component to the larger, adds their sizes, and updates largest.
An edge inside one component leaves its size unchanged.
Append largest after all currently available edges are processed.
Path compression accelerates subsequent root lookups without changing component sizes.

## Walkthrough

```text
Input: [3, [[0, 1, 2], [1, 2, 4]], [1, 2, 4]]
Output: [1, 2, 3]
```

Example 1 initially has three singleton components, so the time-1 answer is 1.
At time 2, edge 0-1 merges two singletons, making the largest size 2.
At time 4, edge 1-2 merges that pair with the remaining singleton, making size 3.
The results are `[1, 2, 3]`.

## Complexity

With E edges and Q queries, time is O(V + E log E + E alpha(V) + Q).
The alpha term comes from union by size combined with path compression.
Arrays, sorted edges, and output require O(V + E + Q) space.

## Edge cases

A graph with no edges always returns 1 because V is positive.
Equal-time edges must all be processed before that query's answer.
Repeated query times need no additional work beyond output.

## Common mistakes

Do not add component sizes when both endpoints already have the same root.
Count vertices, not edges, in a component.

## Language notes

Python creates a sorted copy of the edge list.
Java sorts the supplied outer edge array in place, while both preserve each edge's endpoint and timestamp values.
