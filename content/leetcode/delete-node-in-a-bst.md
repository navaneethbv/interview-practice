# Delete Node in a BST

Delete the node with value `key` from the binary search tree, if present, and return the resulting root.
The result must remain a valid BST containing every other original value exactly once.
Any tree shape satisfying those requirements is accepted.

## Examples

### Example 1

```text
Input: root = [5, 3, 6, 2, 4, null, 7], key = 3
Output: [5, 4, 6, 2, null, null, 7]
Explanation: Replace the deleted node using its inorder successor.
```

### Example 2

```text
Input: root = [1], key = 1
Output: null
Explanation: Deleting the only node leaves an empty tree.
```

## Constraints

- The tree contains 0 through 10,000 nodes with distinct values.
- -100,000 <= Node.val, key <= 100,000
