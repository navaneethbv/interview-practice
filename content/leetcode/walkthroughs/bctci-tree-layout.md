## Intuition

A coordinate depends on how many left and right edges occur on the root-to-node path.
Their order does not matter, so distinct paths can place different nodes on the same grid position.

## Brute force

Storing every node coordinate and comparing every pair would take quadratic time.
A frequency map counts collisions directly during one traversal.

## Approach

Start the root at row zero and column zero.
Pop `(node, row, col)` from a traversal stack and increment the count for that coordinate.
Push a left child at `(row + 1, col)` and a right child at `(row, col + 1)`.
Return the largest coordinate count, either maintained incrementally or found after traversal.
Inductively, the stored coordinate reflects exactly the required movement for every edge of the node's path.
Nodes are counted individually even when their values or positions coincide.

## Walkthrough

```text
Input: root = [1, 2, 3, 4, 5, 6, null, null, 7, null, null, 8, 9]
Output: 2
```

In Example 1, node 5 is reached by left then right and node 6 by right then left.
Both land at coordinate `(1, 1)`, so its count becomes two.
Node 7 and node 8 also share coordinate `(2, 1)` through different path orders.
No coordinate receives more than two nodes, producing the result 2.

## Complexity

With n nodes, expected time is O(n) using hash-map updates.
The coordinate map uses O(n) space in the worst case, and the depth-first stack uses O(h) for height h.
The original tree is not modified.

## Edge cases

A singleton has maximum occupancy one.
A single-direction chain uses distinct coordinates.
Collisions are possible only for nodes with the same combined left-and-right step count, hence the same depth.

## Common mistakes

This layout does not move both children down a row.
Do not key counts by node value rather than coordinate.

## Language notes

Python uses tuple coordinate keys in Counter.
Java packs row and column into one long using a 20-bit shift; the height bound keeps the fields disjoint.
