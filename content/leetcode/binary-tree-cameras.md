# Binary Tree Cameras

A camera placed at a tree node monitors that node, its parent, and its immediate children.
Return the fewest cameras needed to monitor every node.

## Examples

### Example 1

```text
Input: root = [0, 0, null, 0, 0]
Output: 1
Explanation: A camera on the root's left child covers all four nodes.
```

### Example 2

```text
Input: root = [0]
Output: 1
Explanation: The single node needs one camera.
```

## Constraints

- 1 <= number of nodes <= 1000
- Every node value is 0.
