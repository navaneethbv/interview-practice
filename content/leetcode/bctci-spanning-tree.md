# Spanning Tree

The graph is given as an adjacency list: `graph[i]` lists the neighbors of node `i`, and nodes are numbered from 0.
The graph is undirected, connected, and has no self-loops or parallel edges.
Return a spanning tree as a list of `[u, v]` edges: `V - 1` edges of the graph that connect every node without a cycle.
Any valid spanning tree is accepted.

## Examples

### Example 1

```text
Input: graph = [[1], [0, 2, 5], [1, 3, 4], [2], [2, 5], [1, 4]]
Output: [[0, 1], [1, 2], [1, 5], [2, 3], [2, 4]]
```

### Example 2

```text
Input: graph = [[]]
Output: []
```

## Constraints

- `1 <= graph.length <= 1,000`
