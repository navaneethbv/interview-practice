# Tree Check

The graph is given as an adjacency list: `graph[i]` lists the neighbors of node `i`, and nodes are numbered from 0.
Given a non-empty undirected graph with no self-loops or parallel edges, return whether it is a tree: connected and without cycles.

## Examples

### Example 1

```text
Input: graph = [[2], [2, 5], [0, 1, 3, 4], [2], [2], [1]]
Output: true
```

### Example 2

```text
Input: graph = [[1], [0, 2, 5], [1, 3, 4], [2], [2, 5], [1, 4]]
Output: false
```

## Constraints

- `1 <= graph.length <= 1,000`
