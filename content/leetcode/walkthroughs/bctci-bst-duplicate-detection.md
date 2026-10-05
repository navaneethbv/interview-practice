## Intuition

An inorder traversal of this nonstrict binary search tree produces a nondecreasing sequence.
If a value occurs more than once, equal copies must therefore appear next to each other somewhere in that sequence.

## Brute force

A hash set could detect repeats while visiting nodes in any order, but would retain up to all n values.
Comparing adjacent inorder values uses the tree ordering and needs only the traversal stack.

## Approach

Use `stack` and `node` to descend through left children.
Pop the next inorder node, compare its value with `previous`, then save its value and continue through its right child.
Return true immediately on equality; return false when traversal finishes.

## Walkthrough

Example 1 starts its inorder sequence with 2, 4, and 5.
The next visited value is 9, which becomes `previous`.
Another node with value 9 follows it, so the comparison succeeds and returns true without needing to finish the remaining subtree.

## Complexity

Worst case time is O(n), because each node is pushed and popped once.
Auxiliary space is O(h) for height h, plus the previous value.
The tree need not be balanced, so h is not automatically logarithmic.

## Edge cases

An empty tree and a single node both return false.
Duplicates may lie in either subtree under the local definition.
Equal values need not be parent and child, which is why checking only immediate child values is insufficient.

## Common mistakes

Do not apply a strict BST assumption that rejects duplicates before searching.
An ordinary numeric sentinel for `previous` might collide with a legitimate value.
Always process a node after its entire left subtree and before its right subtree.

## Language notes

Python uses `None` to represent the absence of a previous value.
Java uses nullable `Integer` and checks it before comparing against the primitive `node.val`.
Both iterative traversals avoid recursive call stack growth on tall trees.
