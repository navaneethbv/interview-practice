# Construct Binary Tree from Inorder and Postorder Traversal

Reconstruct the binary tree described by its inorder and postorder traversals.
Inorder visits left subtree, root, then right subtree; postorder visits left subtree, right subtree, then root.
All node values are distinct, so the valid input determines one tree.

## Examples

### Example 1

```text
Input: inorder = [2, 1, 3], postorder = [2, 3, 1]
Output: [1, 2, 3]
Explanation: 1 is the final postorder value and therefore the root.
```

### Example 2

```text
Input: inorder = [5], postorder = [5]
Output: [5]
Explanation: The tree has one node.
```

## Constraints

- 1 <= inorder.length == postorder.length <= 3000.
- -3000 <= values <= 3000.
- The arrays describe the same valid tree with distinct values.
