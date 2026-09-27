## Intuition

Preorder traversal is root, left, right.
A stack visits nodes in that order and rewires each visited node as the right child of the previous node.

## Brute force

Collecting preorder values and then allocating a separate chain uses extra node storage.
It also requires a second traversal to reconnect the original nodes.

## Approach

1. Push the root on a stack.
2. Pop a node, push its right child and then left child.
3. Link the previous node's right pointer to the popped node and clear its left pointer.
4. Clear the final node's left and right pointers.

## Walkthrough

Example 1:

For tree [1,2,3], the stack visits 1, then 2, then 3.
Node 1 points right to 2 and node 2 points right to 3.
All left pointers become null, giving the level-order representation [1,null,2,null,3].

## Complexity

Each node is pushed and popped once, so time is O(n).
The explicit stack uses O(h) space for tree height h, with O(n) worst case.
The existing nodes are rewired in place and no output nodes are allocated.

## Edge cases

An empty root needs no work.
A single node becomes a one-node chain.
The final node must have no children.

## Common mistakes

Push the right child before the left child so left is visited first.
Clear the previous left pointer before continuing.
Do not create replacement TreeNode objects.

## Language notes

Python uses a list stack.
Java uses ArrayDeque and preserves the TreeNode contract supplied by the harness.
The traversal order is visible in the order nodes are pushed and popped.
