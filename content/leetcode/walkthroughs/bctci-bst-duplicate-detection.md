## Intuition

Inorder traversal of this duplicate-permitting BST produces a nondecreasing sequence.
If any value repeats, two equal occurrences must therefore be adjacent in that traversal.
Only the previous visited value is needed to detect repetition.

## Brute force

Collecting values in a set would detect duplicates in linear expected time but require space proportional to the number of distinct values.
Comparing every pair of nodes is quadratic.
The BST ordering lets adjacent comparisons suffice.

## Approach

Use `stack` and `node` to perform iterative inorder traversal.
Push nodes while descending left.
Pop the next node, compare its value with `previous`, then update previous and move to its right subtree.
Return true immediately when two consecutive values are equal.
Return false when both the traversal pointer and stack are empty.
The stack contains ancestors whose own values still need to be visited, preserving left-node-right order without modifying tree links.

## Walkthrough

```text
Input: root = [5, 2, 9, null, 4, 9, 11, null, null, null, 9]
Output: true
```

Example 1 visits the initial values 2, 4, 5, and 9.
The next inorder value is also 9, even though equal nodes need not be directly connected by an edge.
The comparison with `previous` succeeds at this point and returns true.
The remaining values do not need to be examined because one repeated value is sufficient evidence.

## Complexity

Worst-case time is O(n), with early termination when a duplicate is found.
The stack uses O(h) space for tree height h.
A skewed tree can require linear stack space.

## Edge cases

An empty tree and a singleton return false.
Duplicates may occur on either side under this problem's non-strict BST definition.
Zero is an ordinary valid value.

## Common mistakes

Checking only parent-child equality can miss duplicates separated in the tree.
A numeric sentinel for previous can collide with an actual node value.

## Language notes

Python uses `None` to represent no previous value.
Java uses nullable `Integer`; comparison with the primitive node value unboxes it after the null check.
