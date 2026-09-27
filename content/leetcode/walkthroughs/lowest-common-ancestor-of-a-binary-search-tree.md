## Intuition

The BST ordering tells us whether both target nodes lie on the same side of the current node.
If they do, their lowest common ancestor must lie on that side too.
The first node where their values split, or equal a target, is the lowest node that can contain both targets below it.

## Brute force

Find and store the root-to-target path for each node, then compare the paths until they diverge.
This can use O(h) extra space for height h.
The BST value ranges let us follow just the shared path with constant auxiliary space.

## Approach

1. Let `lower` be the smaller of `p.val` and `q.val`, and `upper` the larger.
2. Starting at `root`, move right if the current value is below `lower`.
3. Move left if it is above `upper`.
4. Otherwise return the current node because its value lies between the targets, inclusively.

Every descent preserves the fact that both targets belong to the selected subtree.
At the first inclusive split, descending into either child would exclude at least one target.
Therefore this node is common to both target paths and no lower node can be common to both.

## Walkthrough

Example 1 uses the BST rooted at 6 with `p = 2` and `q = 8`.

| Current node | `lower` | `upper` | Decision |
| --- | --- | --- | --- |
| 6 | 2 | 8 | Inside the inclusive range; return this node |

Node 2 lies in the left subtree and node 8 in the right subtree.
Their shared path ends at the root, so the answer displays as 6.
The actual return value is that existing node object, not the integer 6.

## Complexity

- Time: O(h), following one root-to-descendant path; worst case O(n) for an unbalanced tree.
- Space: O(1), retaining only the current node and target-value bounds.

## Edge cases

If the current node is one target and contains the other below it, that node is the answer.
Target argument order does not matter because bounds use minimum and maximum.
Negative values obey the same comparisons.
Both targets are guaranteed to exist and have distinct values.

## Common mistakes

- Returning a newly allocated node with the same value violates the identity contract.
- Using strict splitting only misses the case where a target is itself the ancestor.
- Applying BST comparisons to an arbitrary binary tree is invalid.

## Language notes

Both versions return the original `TreeNode` reference encountered during descent.
Java uses `Math.min` and `Math.max`; Python uses their built-in equivalents.
No recursion is used, which matters for the allowed 100,000-node skewed trees.
