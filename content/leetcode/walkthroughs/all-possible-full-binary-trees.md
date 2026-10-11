## Intuition

Remove the root of a full binary tree and you get two full binary trees whose sizes add up to n - 1. Every full tree has an odd size, so trying every odd left size and combining all left and right possibilities enumerates every tree exactly once.

## Approach

1. Return an empty list for even n.
2. Size 1 is a single leaf.
3. For each odd left size from 1 to n - 2, combine every tree of that size with every tree of size n - 1 - left under a new root.
4. Memoize results by size so smaller trees are built once and shared.

## Walkthrough

For n = 5, left sizes 1 and 3 are possible. Left 1 with right 3 gives one tree and left 3 with right 1 gives another, so there are two trees.

## Complexity

- Time: O(C(n/2) * n), where C is the Catalan number.
- Space: Proportional to the output.

## Edge cases

- Even n has no full tree.
- Sharing subtrees between results is fine because the trees are never modified.

## Common mistakes

- Trying even subtree sizes, which never produce full trees.
- Building each subtree from scratch every time without memoization.
