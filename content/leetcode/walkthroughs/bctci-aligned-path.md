## Intuition

An aligned path can join a downward chain from each child through their parent.
A parent can extend only one of those chains upward, because a path cannot branch into three directions.
Alignment uses depth in the original tree, even when the winning path starts below the root.

## Brute force

Starting a traversal from every aligned node can repeatedly explore the same subtrees and take O(n squared) time.
A single postorder traversal can summarize exactly the information each parent needs.

## Approach

`chain(node, depth)` first computes the left and right child chains.
If `node.val != depth`, it returns zero, blocking any chain through this node.
Otherwise it updates `best` with `left + right + 1` and returns `max(left, right) + 1`.
The global best includes paths wholly inside a subtree, while the return value describes only a chain that can connect to the parent.
Children must still be explored when their parent is not aligned.

## Walkthrough

In Example 1, root value 7 does not equal depth zero.
The left child 1 is aligned at depth one, and its child 2 is aligned at depth two.
A descendant 3 at depth three completes a three-node path.
On the right, the depth-two value 2 joins two aligned depth-three values 3, also giving three nodes.
The final answer is 3.

## Complexity

Each of n nodes is processed once, so time is O(n).
The recursive stack takes O(h) auxiliary space for tree height h.

## Edge cases

A null tree returns zero.
A single root contributes one only when its value is zero.
A nonaligned ancestor does not invalidate paths contained entirely below it.

## Common mistakes

Returning `left + right + 1` to the parent would allow branching paths.
Counting edges instead of nodes would undercount every nonempty answer by one.

## Language notes

Python updates the enclosing `best` through `nonlocal`.
Java stores it in a field, with one freshly constructed solution instance used for the testcase.
