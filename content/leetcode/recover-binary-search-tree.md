# Recover Binary Search Tree

Two node values in a binary search tree were exchanged by mistake.
Restore the valid BST by correcting values without changing the tree structure.
The displayed output is the corrected tree.

## Examples

### Example 1

```text
Input: root = [1, 3, null, null, 2]
Output: [3, 1, null, null, 2]
Explanation: Swap the values 1 and 3.
```

### Example 2

```text
Input: root = [3, 1, 4, null, null, 2]
Output: [2, 1, 4, null, null, 3]
Explanation: Swap 2 and 3 without moving any nodes.
```

## Constraints

- The tree contains 2 through 1,000 nodes with distinct values.
- Exactly two values were swapped in an otherwise valid BST.
- Node values fit signed 32-bit integers.
