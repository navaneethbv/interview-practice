## Intuition

As time advances, edges only appear and connected components can only merge.
Since query times are nondecreasing, one persistent disjoint set structure can represent all edges available at the current query.

## Brute force

Rebuilding the graph and running a component traversal for every query repeats earlier work.
Sorting edges once lets the solution process each edge only when it first becomes relevant, regardless of how many later queries follow.

## Approach

Initialize `DisjointSets(V)` with `groups = V`.
Sort edges by timestamp and advance `position` while timestamps are at most the query `time`.
Call `join` for each edge, decrementing `groups` only when distinct roots merge.
Append the current group count to `answer`.

## Walkthrough

Example 1 starts with three isolated vertices.
At time 1 no edges qualify, so record 3.
At time 2, edge 0 to 1 merges two groups and yields 2.
At time 4, edge 1 to 2 connects the remaining vertex and yields 1.

## Complexity

For E edges and Q queries, time is O(V + E log E + E alpha(V) + Q), where alpha is the inverse Ackermann function.
Disjoint set arrays use O(V) space.
Python's sorted edge copy uses O(E), and the answer uses O(Q).

## Edge cases

Repeated query times reuse the same graph state.
An edge with timestamp exactly equal to a query must already be included.
Edges closing a cycle do not change the component count.
With one vertex and no edges, every answer is one.

## Common mistakes

Do not decrement `groups` for every edge unconditionally.
Do not restart `position` between queries.
The input guarantee about sorted query times is essential because this structure cannot undo edges for a query that moves backward in time.

## Language notes

Both helpers use union by size and path halving in `find`.
Python sorts into `ordered`; Java sorts the provided edge array in place.
Java's sorting storage is implementation dependent, while its disjoint set arrays have explicit linear size.
