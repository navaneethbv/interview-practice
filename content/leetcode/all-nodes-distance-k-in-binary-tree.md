# All Nodes Distance K in Binary Tree

Return the values of all nodes exactly `k` edges from the target node, in any order.
You may travel from a node to its parent or either child.
The testcase identifies target by its unique value; the function receives the actual node.

## Examples

### Example 1

```text
Input: root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], target = 5, k = 2
Output: [7, 4, 1]
Explanation: Two edges from node 5 reach nodes 7, 4, and 1.
```

### Example 2

```text
Input: root = [1], target = 1, k = 0
Output: [1]
Explanation: Distance zero includes the target itself.
```

## Constraints

- The tree contains 1 through 500 nodes with distinct values from 0 through 500.
- target belongs to the tree.
- 0 <= k <= 1,000
