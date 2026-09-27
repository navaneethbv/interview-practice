# Construct Binary Tree from Preorder and Postorder Traversal

Return a binary tree matching the supplied preorder and postorder traversals.
Preorder visits root, left, right; postorder visits left, right, root.
Several tree shapes may fit, and any fitting shape is accepted.

## Constraints

- Both arrays have the same length from 1 to 30.
- Values are distinct integers from 1 to n and the traversals are consistent.

## Examples

### Example 1

```text
Input: preorder = [1, 2, 3], postorder = [2, 3, 1]
Output: [1, 2, 3]
Explanation: The root has two leaf children.
```

### Example 2

```text
Input: preorder = [1, 2], postorder = [2, 1]
Output: [1, 2]
Explanation: The sole child may be on either side.
```
