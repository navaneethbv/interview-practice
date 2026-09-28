## Intuition

The center of a star appears in every edge, so it must appear in both of the first two edges.
Their shared endpoint identifies the answer immediately.

## Brute force

Counting degrees across all edges costs O(n).
The star guarantee makes two edge comparisons sufficient.

## Approach

1. Take the first endpoint of the first edge.
2. If it appears in the second edge, return it.
3. Otherwise return the other endpoint of the first edge.

## Walkthrough

For Example 1, the first edge is `[1,2]` and the second is `[2,3]`.
Endpoint 1 is absent from the second edge, while endpoint 2 appears in both.
The method returns 2, which also appears in the third edge `[4,2]`.

## Complexity

Time and auxiliary space are O(1), independent of the number of edges.
Only the first two two-element arrays are inspected.

## Edge cases

The center can be listed first or second in either edge.
The star has at least three vertices, so two edges always exist.
The remaining edges are unnecessary once the shared endpoint of the first two is known.
Labels need not be processed numerically because the argument depends only on membership.
This works because a noncenter leaf can belong to only one star edge, so it cannot be shared by both initial edges.

## Common mistakes

Do not assume the center is `edges[0][0]`.
Check membership in both positions of the second edge.
The edge direction in the input is irrelevant.

## Language notes

Python uses list membership on the second two-element edge.
Java checks its two endpoints explicitly.
