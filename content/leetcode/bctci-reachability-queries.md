# Reachability Queries

The graph is given as an adjacency list: `graph[i]` lists the neighbors of node `i`, and nodes are numbered from 0.
The graph is undirected.
For each query `[a, b]`, report whether `a` and `b` are in the same connected component, and return the answers in order.

## Examples

### Example 1

```text
Input: graph = [[1], [0, 2, 5, 4], [1, 4, 5], [], [5, 2, 1], [1, 2, 4]], queries = [[0, 4], [0, 3]]
Output: [true, false]
```

### Example 2

```text
Input: graph = [[1], [0], [3], [2]], queries = [[0, 1], [0, 2], [2, 3]]
Output: [true, false, true]
```

## Constraints

- `graph.length <= 1,000` and `queries.length <= 1,000`
