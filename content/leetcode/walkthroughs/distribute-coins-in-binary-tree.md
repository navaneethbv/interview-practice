## Intuition

For each subtree, the returned balance is coins available after leaving one coin at every node.
A positive balance moves upward, a negative balance requests coins from above, and every unit crossing either child edge costs one move.

## Brute force

Moving coins greedily from arbitrary nodes can revisit edges and does not reveal the minimum.
Postorder balance counts each edge flow exactly once.

## Approach

1. Recursively balance the left and right subtrees.
2. Add the absolute balances to the move count.
3. Return `node.val + left + right - 1` to the parent.
4. Report the accumulated moves after the root balance is processed.

## Walkthrough

For Example 1, root `[3,0,0]` has each child balance -1.
The root sends one coin across each child edge, contributing `1 + 1 = 2` moves.
The root's final balance is zero, so every node ends with one coin and the answer is 2.

## Complexity

With n nodes, each node is visited once, giving O(n) time and O(h) recursion stack space for height h.
The move counter and balance values are scalar state.

## Edge cases

A one-node tree with one coin needs zero moves.
A subtree can have a negative balance even though the whole tree has exactly n coins.
The local contract guarantees the total balance at the root is zero.

## Common mistakes

Count absolute child flows, not the root's final balance.
Return excess after satisfying the current node.
Do not move coins directly across multiple edges as one move.

## Language notes

Python stores `moves` on the solution object so `_balance` can update it.
Java uses a private field and a recursive helper with the provided `TreeNode` type.
