## Intuition

A valid path follows parent to child with values increasing by one.
For each node, carry the current path length from its parent and reset it when the value jump is not one.

## Brute force

Starting a fresh downward scan from every node can repeat subtrees.
One traversal carries the needed state.

## Approach

1. Start at the root with length one.
2. For each child, extend the length only when `child.val == parent.val + 1`.
3. Push children and maintain the largest length.
4. Return the best path.

## Walkthrough

For Example 1, the tree `[1,null,3,2,4,null,null,null,5]` has the downward path 3,4,5.
The traversal reaches 3 with length 1, extends to 4 with length 2, and then extends to 5 with length 3.
The branch from 1 to 3 does not extend because its values skip from 1 to 3.
The best result is therefore 3.

## Complexity

Each node is visited once, giving O(n) time and O(h) stack space for height h.
The iterative Python and Java traversals avoid recursion depth limits.

## Edge cases

An empty tree returns zero.
A one-node tree returns one.
A decreasing child does not extend this increasing-only sequence.

## Common mistakes

Compare against the parent value, not the previous value from another branch.
Reset to one on a mismatch.
Do not allow paths to move back upward.

## Language notes

Python stores `(node,length)` tuples.
Java keeps parallel node and length deques and uses widened comparison for signed extremes.
Both carry a separate length for each branch, so one branch cannot affect another.
