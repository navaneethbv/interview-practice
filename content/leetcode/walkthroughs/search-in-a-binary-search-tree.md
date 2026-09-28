## Intuition

A BST tells which child subtree can contain val.
Comparing at each node discards the impossible half of the tree.

## Brute force

Scanning every node ignores ordering and costs O(n).
Following one root-to-leaf path costs O(h).

## Approach

1. While the current node exists and does not match, compare val with its value.
2. Move left when val is smaller, otherwise right.
3. Return the existing node or null.

## Walkthrough

For Example 1, searching 2 in `[4,2,7,1,3]` first moves left from 4.
The next node is 2, so the method returns that node as the root of subtree `[2,1,3]`.

## Complexity

Time is O(h) and auxiliary space is O(1), where h is tree height.
The returned subtree is shared with the input and is not copied.

## Edge cases

An absent value returns null.
Searching the root returns the original root.
A skewed tree can make h equal n, but the iterative method avoids recursion depth.

## Common mistakes

Return the matching node, not a newly built copy.
Choose the left branch only for smaller values.
Stop immediately on equality.

## Language notes

Python and Java both use iterative traversal.
The judge serializes the returned existing subtree.
Returning null is the only failure result because the input values are distinct.
Every comparison discards one child subtree that cannot contain the target.
The method returns the complete matching subtree rather than only its value.
No node allocation is needed for a successful search.
The returned reference retains all descendants of the match.
