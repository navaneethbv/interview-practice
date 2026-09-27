# Construct Binary Search Tree from Preorder Traversal

Reconstruct the binary search tree whose preorder traversal is preorder.
Preorder visits a node before its left subtree and then its right subtree.
Every left descendant is smaller than its ancestor, and every right descendant is larger.
Return the root; the judge displays it using level-order values and null placeholders.

## Examples

### Example 1

```text
Input: preorder = [6, 2, 1, 4, 9, 8, 10]
Output: [6, 2, 9, 1, 4, 8, 10]
Explanation: The root is 6, with roots 2 and 9 for its two subtrees.
```

### Example 2

```text
Input: preorder = [4, 2]
Output: [4, 2]
Explanation: The smaller second value becomes the left child.
```

## Constraints

- 1 <= preorder.length <= 100
- 1 <= preorder[i] <= 1000
- Values are distinct and form a valid BST preorder traversal.
