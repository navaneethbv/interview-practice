## Intuition

Inorder traversal of either binary search tree produces nondecreasing values, including duplicates.
The task then becomes merging two sorted sequences.
An explicit traversal stack avoids recursion depth problems for a tree shaped like a long chain.

## Brute force

Collect every value from both trees and sort the combined array.
For N total nodes this costs O(N log N), ignoring the ordering already supplied by the trees.

## Approach

The `_inorder` helper repeatedly pushes the left spine into `stack`.
When that spine ends, pop a node, append `node.val` to `values`, and move to its right child.
Call it for both roots to obtain `first` and `second`.
Use indices `i` and `j` to append the smaller available value to `merged`.
Choose `first[i]` on a tie, preserving every occurrence.
The exhaustion checks ensure the remaining sequence is copied after the other one ends.

## Walkthrough

Example 1 yields `first = [2, 4, 5, 9, 9, 9, 11]` and `second = [1, 3, 6]`.
The merge first takes 1 from `second`, then 2 from `first`, and then 3 from `second`.
It takes 4 and 5 before 6.
Once `second` is exhausted, the three 9 values and 11 are appended.
The final array is `[1, 2, 3, 4, 5, 6, 9, 9, 9, 11]`.

## Complexity

For m and n nodes, traversal and merging take O(m + n) time.
The materialized inorder arrays use O(m + n) auxiliary space, in addition to the returned array.
Traversal stacks require at most the corresponding tree height.

## Edge cases

Either or both roots may be null.
Duplicate values within a tree and across trees must all remain in the answer.

## Common mistakes

Do not use a set, which would discard duplicates.
Do not claim O(height) total space for these references, since they materialize both traversals.

## Language notes

The harness uses `TreeNode.val`.
Python lists and Java `ArrayList` hold the traversals; Java uses `ArrayDeque` for its explicit node stack.
