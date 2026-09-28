# Strongly Connected Graph

The graph is given as an adjacency list: `graph[i]` lists the neighbors of node `i`, and nodes are numbered from 0.
The graph is directed: `graph[i]` lists the nodes that node `i` has edges to.
Return whether every node can reach every other node.

## Examples

### Example 1

```text
Input: graph = [[1, 3], [2], [0], [2]]
Output: true
```

### Example 2

```text
Input: graph = [[1, 2, 3], [2], [], [2]]
Output: false
```

## Constraints

- `1 <= graph.length <= 1,000`
