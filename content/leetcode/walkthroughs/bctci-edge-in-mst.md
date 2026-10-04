## Intuition

An edge is mandatory in every minimum spanning tree precisely when its endpoints cannot be connected without it using edges of no greater weight.
An alternative connection of equal weight is enough to make the target replaceable.

## Brute force

Build a minimum spanning tree, remove the target edge from consideration, and build another one to compare optimal costs.
That works but requires sorting and full tree construction when a threshold connectivity test suffices.

## Approach

Read the target endpoints `u`, `v` and its `weight`.
Create `DisjointSets` for all vertices.
Join endpoints of every other edge whose cost is at most the target weight.
Return whether the target endpoints remain in different components.
If separated, every alternative crossing edge is more expensive, making the target the unique cheapest edge across that component cut.
If connected, an alternate path can replace the target in a tree without increasing cost.

## Walkthrough

Example 1 is a triangle with all three weights equal to one, and edge zero is the target.
Exclude the edge from 0 to 1.
Joining edges 1-to-2 and 0-to-2 still connects vertices 0 and 1.
Their representatives are equal, so the result is false.
A minimum tree can use the other two equal-weight edges instead.

## Complexity

For V vertices and E edges, initialization costs O(V) and union-find processing takes O(E alpha(V)) amortized time.
Auxiliary space is O(V); this algorithm does not sort edges.

## Edge cases

A bridge is mandatory regardless of negative or positive weight.
Equal weights must be included in the alternative-connectivity test.
The statement guarantees a connected graph and a valid target index.

## Common mistakes

Do not join the target itself, which would force a false result.
Testing only strictly lighter edges determines a different property and mishandles equal-weight alternatives.

## Language notes

Both references use union by size with path compression by halving.
The Python names `u`, `v`, and `weight` correspond to Java's entries in the `target` array.
