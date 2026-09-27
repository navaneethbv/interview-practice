# Flatten Binary Tree to Linked List

Rewire the existing nodes so their right pointers form the original tree's preorder traversal.
Set every left pointer to null.
Do this in place; the judge displays the modified root as a level-order tree.

## Constraints

- The tree contains 0 to 2000 nodes.
- Values range from -100 to 100.

## Examples

### Example 1

```text
Input: root = [1, 2, 3]
Output: [1, null, 2, null, 3]
Explanation: Preorder visits 1, then 2, then 3.
```

### Example 2

```text
Input: root = []
Output: null
Explanation: The empty tree stays empty.
```
