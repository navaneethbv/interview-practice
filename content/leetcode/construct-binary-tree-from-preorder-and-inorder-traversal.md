# Construct Binary Tree from Preorder and Inorder Traversal

Rebuild and return a binary tree from its preorder and inorder traversals.
Preorder visits a node before its left and right subtrees; inorder visits its left subtree, the node, then its right subtree.
All node values are distinct and the traversals describe the same tree.

## Constraints

- `1 <= preorder.length == inorder.length <= 3000`.
- Values range from -3000 to 3000 and are unique.

## Examples

### Example 1

```text
Input: preorder = [4, 2, 1, 3, 6], inorder = [1, 2, 3, 4, 6]
Output: [4, 2, 6, 1, 3]
Explanation: The first preorder value 4 is the root.
```

### Example 2

```text
Input: preorder = [-2], inorder = [-2]
Output: [-2]
Explanation: A single value gives a one-node tree.
```
