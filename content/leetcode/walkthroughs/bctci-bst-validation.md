## Intuition

Checking only a node's immediate children is insufficient because every ancestor imposes a bound on its whole descendant subtree.
Carry the allowed interval down the tree and require each value to remain inside it.
Both interval endpoints are inclusive because this version permits duplicates.

## Brute force

For each node, independently scan its left subtree for the maximum and its right subtree for the minimum.
Repeated subtree scans can cost O(n squared) on an unbalanced tree.

## Approach

The Python stack starts with `(root, negative infinity, positive infinity)`.
Pop a node and its `low` and `high` bounds, skipping null entries.
Reject a value outside the interval.
Its left child inherits the lower bound and receives the current value as its upper bound.
Its right child inherits the upper bound and receives the current value as its lower bound.
Java expresses the same recurrence with `valid` calls instead of an explicit stack.

## Walkthrough

In Example 1, root 5 divides the allowed ranges at 5.
The left subtree contains 2 and 4, both within its upper bound.
The right subtree contains 9, 9, 11, and another 9.
The nested 9 can equal its ancestor's boundary, so it remains valid.
Every interval check succeeds and the output is true.

## Complexity

Each of n nodes is checked once, giving O(n) time.
The depth-first pending work or recursive calls require O(h) auxiliary space for tree height h.

## Edge cases

The empty tree is valid.
Repeated values are permitted on both sides when they also respect all ancestor bounds.
Integer extremes need bounds that do not overflow.

## Common mistakes

Using strict inequalities would reject legal duplicates.
Resetting bounds at each node would miss violations involving a more distant ancestor.

## Language notes

Python uses floating-point infinities only as comparison sentinels, without converting node values.
Java uses `long` bounds initialized to its extreme values, so every allowed integer node value is representable.
