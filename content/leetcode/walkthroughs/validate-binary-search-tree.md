## Intuition

Every ancestor restricts the range of values allowed in a descendant subtree.
Checking only a node against its immediate children misses violations of more distant ancestors.
Carry an exclusive lower and upper bound with each node to enforce all those restrictions together.

## Brute force

At every node, scan its entire left and right subtrees to check their values.
This can take O(n²) time on a chain because the same descendants are examined repeatedly.
Passing inherited bounds checks each node once.

## Approach

1. Start an explicit stack with the root and unrestricted bounds.
2. Pop a `(node, lower, upper)` frame and skip null nodes.
3. Return false unless `lower < node.val < upper`.
4. Push the left child with the same lower bound and `node.val` as its upper bound.
5. Push the right child with `node.val` as its lower bound and the same upper bound.
6. Return true when all frames pass.

Bounds are strict because duplicate values are forbidden.
Each child inherits the ancestor restriction that its parent's new bound does not replace.
This makes a deep misplaced value fail even if it agrees with its immediate parent.

## Walkthrough

Example 1 is `[8, 4, 12, 2, 6, 10, 14]`.

| Node | Required open interval |
| --- | --- |
| 8 | Unrestricted |
| 4 | Less than 8 |
| 2 | Less than 4 |
| 6 | Between 4 and 8 |
| 12 | Greater than 8 |
| 10 | Between 8 and 12 |
| 14 | Greater than 12 |

Every value satisfies its inherited interval, so return true.
The table groups bounds by subtree; the stack may visit the right subtree first.

## Complexity

- Time: O(n), examining each node once.
- Space: O(h) DFS frames, bounded by O(n) in a skewed tree.

## Edge cases

A singleton is valid even at an `int` extreme.
Equal parent/child values fail the strict comparison.
A value deep in the right subtree must still exceed the root.
Null child positions impose no additional work beyond skipping their frames.

## Common mistakes

- Checking only direct children misses ancestor violations.
- Allowing equality accepts forbidden duplicates.
- Using signed 32-bit sentinels as exclusive initial bounds rejects valid extreme values.

## Language notes

Python uses negative and positive infinity as initial bounds.
Java stores bounds as `long` in a private `Frame` record, safely enclosing every allowed `int` value.
Both avoid arithmetic adjustments such as value plus or minus one, which could overflow at extremes.
