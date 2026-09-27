## Intuition

The successor of `p` is the smallest node whose value is greater than `p.val`.
At each BST node, a greater value is a candidate, but the successor might be farther left.
A value less than or equal to `p.val` cannot be the answer, so move right to find larger values.

## Brute force

An inorder traversal followed by a linear scan takes O(n) time and O(h) recursion or stack space.
The BST ordering lets the direct search discard one subtree at every comparison and use O(h) time.

## Approach

1. Keep `successor = None`.
2. If `root.val > p.val`, record `root` and continue left for a smaller valid candidate.
3. Otherwise move right because the current node cannot be the successor.
4. Return the last recorded candidate when the search path ends.

## Walkthrough

Example 1 uses root `[2,1,3]` and `p = 1`.

| current root | comparison | `successor` | next move |
| ---: | --- | ---: | --- |
| 2 | 2 > 1 | 2 | move left |
| 1 | 1 is not greater | 2 | move right to null |

Node 2 is the smallest value greater than 1.

## Complexity

- Time: O(h), because the search follows one root-to-leaf path.
- Space: O(1) auxiliary, because the iterative search stores one candidate pointer.

## Edge cases

When `p` is the maximum node, no candidate is found and the result is null.
The successor may be an ancestor reached after moving left.
If the tree contains a right subtree, the search reaches its smallest greater node through left moves.
The BST contract makes duplicate values outside the target assumptions irrelevant to the comparison path.

## Common mistakes

- Returning the first greater node can miss a smaller candidate in its left subtree.
- Moving left when the current value is not greater discards all possible successors.
- Traversing by node identity rather than comparing values loses the BST shortcut.

## Language notes

Python uses `None` and node references directly.
Java uses `null` and a `TreeNode successor` variable with the same iterative path.
Neither implementation builds an inorder list.
