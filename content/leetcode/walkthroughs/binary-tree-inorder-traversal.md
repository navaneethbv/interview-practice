## Intuition

Inorder traversal visits the left subtree, then the node, then the right subtree.
A stack stores ancestors whose left side has not finished.
After popping a node, moving to its right subtree repeats the same process.

## Brute force

A recursive traversal is a direct alternative but uses O(H) call-stack space for tree height H.
On a deeply skewed valid tree, recursion can exceed a language recursion limit.
The explicit stack keeps the same traversal order without recursive calls.

## Approach

1. Set current to root and create an empty stack.
2. Push current and every left descendant.
3. Pop the next unvisited node and append its value.
4. Move current to that node's right child.
5. Continue until both current and the stack are empty.

## Walkthrough

Example 1 is [1,null,2,3].
The scan pushes 1, visits it, and moves to 2.
It then pushes 3 from 2's left child, visits 3, and returns to 2.
Visiting 2 completes the order [1,3,2].

## Complexity

For n nodes, every node is pushed and popped once, so time is O(n).
The explicit stack uses O(H) auxiliary space.
The returned traversal list uses O(n) output space.
The method does not modify the tree.

## Edge cases

A null root returns an empty list.
A single node is pushed, popped, and returned.
A left-skewed tree keeps all ancestors in the stack.
A right-skewed tree keeps at most one active node after each visit.

## Common mistakes

- Appending before exploring the left subtree produces preorder order.
- Forgetting to move to the right child skips an entire subtree.
- Stopping when current is null ignores ancestors still in the stack.
- Recursive code may fail at depths allowed by the tree contract.

## Language notes

Python stores TreeNode objects in a list stack.
Java uses Deque and the harness-provided TreeNode helper.
Both output values in inorder without recursion.
