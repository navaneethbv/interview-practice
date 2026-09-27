# Binary Tree Level Order Traversal

Return one list of node values for each depth, starting at the root.
Within a depth, list nodes from left to right.
An empty tree produces an empty outer list.

## Constraints

- The tree contains 0 to 2000 nodes.
- Node values range from -1000 to 1000.

## Examples

### Example 1

```text
Input: root = [6, 2, 8, null, 4]
Output: [[6], [2, 8], [4]]
Explanation: Values are grouped by distance from the root.
```

### Example 2

```text
Input: root = []
Output: []
Explanation: There are no levels.
```
