## Intuition

As timestamped edges arrive, component sizes only increase when two different components merge.
A disjoint set forest can maintain those sizes and a running largest size while query times move forward.

## Brute force

Recomputing connected components from scratch for each query repeats all earlier edge processing.
The nondecreasing query guarantee allows one sorted edge scan and a persistent structure shared across every query.

## Approach

Initialize every component size to one and `largest` to one.
Sort edges by time and advance `position` through all edges available for the current query.
`join` attaches the smaller root tree to the larger, updates its size, and maximizes `largest`.
Append that value.

## Walkthrough

Example 1 initially has three singleton components, so time 1 returns 1.
At time 2, connecting 0 and 1 creates size 2.
At time 4, connecting 1 and 2 creates size 3.
The resulting query answers are `[1, 2, 3]`.

## Complexity

With E edges and Q queries, time is O(V + E log E + E alpha(V) + Q).
The inverse Ackermann factor comes from union by size with path halving.
Disjoint set storage is O(V), Python's ordered copy O(E), and output O(Q).

## Edge cases

An isolated graph still has largest component size one because V is positive.
Repeated query times yield repeated states.
Edges exactly matching a query timestamp are included.
A cycle edge leaves sizes unchanged when both endpoints have the same root.

## Common mistakes

Do not add component sizes when the representatives are already equal.
Do not reset `largest` between queries or process only edges with strictly smaller timestamps.
The largest component need not contain any particular distinguished vertex.

## Language notes

Python sorts into a new `ordered` list.
Java sorts `edges` in place and stores answers in an integer array.
Both update `sizes` only at surviving roots, so queries should read `largest` rather than arbitrary nonroot size entries.
