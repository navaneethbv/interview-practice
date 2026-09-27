# Minimum Cost Path with Edge Reversals

Travel from node 0 to node n-1 in a directed weighted graph.
An edge [u,v,w] normally allows u to v for cost w.
Each node has a switch usable at most once: on arriving there, you may reverse one incoming edge for that move and immediately follow it for twice its usual cost.
The edge then returns to its original direction.
Return the cheapest travel cost, or -1 if the destination cannot be reached.

## Examples

### Example 1

```text
Input: n = 3, edges = [[0, 1, 4], [2, 1, 3]]
Output: 10
Explanation: Travel to node 1 for 4, then reverse the edge from 2 for another 6.
```

### Example 2

```text
Input: n = 3, edges = [[0, 1, 2]]
Output: -1
Explanation: Node 2 has no connecting edge.
```

## Constraints

- 2 <= n <= 50000
- 1 <= edges.length <= 100000
- 0 <= u, v < n; 1 <= w <= 1000
