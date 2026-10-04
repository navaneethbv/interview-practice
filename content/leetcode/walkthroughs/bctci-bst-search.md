## Intuition

At a binary search tree node, comparing the target with the node value identifies the only subtree that can contain it.
The allowed duplicates do not change this rule once equality is checked first.

## Brute force

A full depth first traversal could test every node, costing O(n) even in a balanced tree.
The reference instead follows a single root to leaf route and discards an entire impossible subtree at each step.

## Approach

Initialize `node` to `root`.
While it exists, return true if `node.val == target`.
Otherwise move to `node.left` when the target is smaller and `node.right` when it is larger.
Reaching a missing child proves that the target is absent.

## Walkthrough

In Example 1, target 4 is less than the root value 5, so search moves left to 2.
Since 4 is greater than 2, it moves right to 4.
Equality then returns true, without visiting the subtree rooted at 9.

## Complexity

Time is O(h), where h is the tree height, because only one node per level is examined.
This becomes O(log n) for a balanced tree and O(n) for a chain.
The iterative reference uses O(1) auxiliary space.

## Edge cases

A null root immediately produces false.
A matching root returns true without inspecting children.
Repeated copies of the target elsewhere are irrelevant because the requested output is existence, not a count or a particular node identity.

## Common mistakes

Do not choose a subtree before testing equality.
Do not binary search the level order fixture array, which is a serialization rather than a sorted sequence.
Only tree links and the BST ordering justify eliminating a branch.

## Language notes

Both references keep one local `node` variable and leave the tree unchanged.
Python uses a conditional expression to select the next child, while Java uses the ternary operator.
The harness supplies `TreeNode` with the value field named `val`.
