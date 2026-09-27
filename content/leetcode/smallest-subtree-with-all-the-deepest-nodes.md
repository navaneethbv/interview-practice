# Smallest Subtree with all the Deepest Nodes

Return the root of the smallest subtree containing every node at the greatest depth of the input tree.
A subtree includes its root and all descendants.
The displayed output serializes that subtree in level order.

## Examples

### Example 1

```text
Input: root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]
Output: [2, 7, 4]
Explanation: The deepest nodes 7 and 4 are both inside the subtree rooted at 2.
```

### Example 2

```text
Input: root = [1]
Output: [1]
Explanation: The only node is also the deepest.
```

## Constraints

- The tree contains 1 through 500 nodes with distinct values from 0 through 500.
