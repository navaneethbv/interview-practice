## Intuition

Every child of a node at depth d lies at depth d + 1.
Thus the total number of children of level d is simply the size of the next level.
Prolificness is the ratio of consecutive level sizes, without needing individual node degrees afterward.

## Brute force

For every depth, traverse the whole tree again to count its nodes and their children.
A tall tree can make these repeated traversals quadratic.

## Approach

Perform breadth-first traversal and append each level's node count to `sizes`.
Append a final zero to represent the nonexistent level after the leaves.
Start `best = 0` and compare each later depth's ratio `sizes[depth + 1] / sizes[depth]` with the best ratio.
Use cross multiplication to compare them exactly without floating-point rounding.
Update best only for a strictly larger ratio, preserving the earliest level when ratios tie.
An empty root returns -1 before any traversal.

## Walkthrough

Example 1 has level sizes 1, 1, 2, and 3.
The root has one child, giving prolificness 1.
Level 1 contains node 2, which has two children, giving prolificness 2.
Level 2 has three children across two nodes, giving 1.5.
The last level has no children, giving zero.
The maximum ratio belongs to level 1, so the method returns 1.

## Complexity

Each node is visited once, giving O(n) time.
The breadth-first frontier plus the list of level sizes require O(n) worst-case auxiliary space.

## Edge cases

A single-node tree returns level 0 with prolificness zero.
A chain has ratio one on every nonleaf level, so the earliest such level wins.

## Common mistakes

Maximizing the number of nodes on a level is a different problem.
Use a strict comparison for the smallest-depth tie rule.

## Language notes

Python integers make cross products exact.
Java casts to long before multiplication because products of level sizes may overflow int, even though each size itself fits.
