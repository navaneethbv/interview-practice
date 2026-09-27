# Minimum Edge Reversals So Every Node Is Reachable

The directed edges form a tree when directions are ignored.
For each possible starting node, find the minimum number of edges whose direction must be reversed so that every node is reachable from that start.
Return these minima in node order.

## Examples

### Example 1

```text
Input: n = 3, edges = [[0, 1], [2, 1]]
Output: [1, 2, 1]
Explanation: Starting from either endpoint requires one reversal; starting from the middle requires two.
```

### Example 2

```text
Input: n = 3, edges = [[0, 1], [1, 2]]
Output: [0, 1, 2]
Explanation: The chain already points outward from node 0.
```

## Constraints

- 2 <= n <= 100000
- edges contains n-1 directed edges between distinct nodes from 0 through n-1.
- Ignoring edge directions produces a connected tree.
