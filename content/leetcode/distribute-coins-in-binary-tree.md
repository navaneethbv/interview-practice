# Distribute Coins in Binary Tree

The tree contains n nodes and exactly n coins in total, with each node value giving its coin count.
One move transfers one coin across a parent-child edge.
Return the fewest moves needed to leave one coin at every node.

## Examples

### Example 1

```text
Input: root = [3, 0, 0]
Output: 2
Explanation: Send one coin from the root to each child.
```

### Example 2

```text
Input: root = [0, 3, 0]
Output: 3
Explanation: Two coins move to the root, then one moves to the other child.
```

## Constraints

- The tree contains 1 through 100 nodes.
- 0 <= Node.val <= n; all values sum to n.
