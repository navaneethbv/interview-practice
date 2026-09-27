## Intuition

Cutting the edge above any subtree creates sums `subtree` and `total - subtree`.
So one postorder sum for every subtree gives every possible product without physically removing edges.

## Brute force

Removing each edge and recomputing both component sums would take O(n²) time.
The subtree-sum table reuses the same totals for every candidate cut.

## Approach

1. Build an iterative node order starting from the root.
2. Process that order backwards to compute each subtree sum.
3. For every non-root node, evaluate `subtreeSum * (total - subtreeSum)`.
4. Return the maximum product modulo 1000000007.

## Walkthrough

This is Example 1 from the local statement.
For root `[1,2,3,4,5,6]`, the total sum is 21.
The subtree rooted at 2 contains values 2, 4, and 5, so its sum is 11, while the subtree rooted at 3 has sum 9.
The cut above node 2 leaves 10, giving product `11 * 10 = 110`, which exceeds the product `9 * 12 = 108` from the other internal cut.
The maximum is taken before applying the modulus, as required.

## Complexity

The iterative traversal and reverse sum pass each take O(n) time, followed by one O(n) product scan.
The order list and identity-keyed sum map use O(n) auxiliary space.

## Edge cases

The root cannot be cut above itself, so product candidates start with the second node in traversal order.
A two-node tree has exactly one candidate edge.
Subtree sums and products use wide arithmetic before the final modulus.

## Common mistakes

Do not include the whole-tree sum as a cut candidate.
Compute `total - subtreeSum` for the other component.
Apply modulo after finding the maximum, not before comparing products.

## Language notes

Python maps node objects to sums, while Java uses `IdentityHashMap` to distinguish nodes by identity.
Both use iterative traversal to avoid recursion depth problems for 50,000 nodes.
