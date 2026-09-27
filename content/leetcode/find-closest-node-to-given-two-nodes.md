# Find Closest Node to Given Two Nodes

Each node has at most one outgoing edge: edges[i] is its destination, or -1.
Among nodes reachable from both starting nodes, minimize the larger of the two shortest-path distances.
Break ties using the smallest node index and return -1 if no common node exists.

## Examples

### Example 1

```text
Input: edges = [2, 2, 3, -1], node1 = 0, node2 = 1
Output: 2
Explanation: Both starts reach node 2 in one edge.
```

### Example 2

```text
Input: edges = [-1, -1], node1 = 0, node2 = 1
Output: -1
Explanation: The starts cannot reach each other.
```

## Constraints

- 2 <= edges.length <= 100000
- -1 <= edges[i] < edges.length; edges[i] != i.
- 0 <= node1, node2 < edges.length
