# Graph Path

The graph is given as an adjacency list: `graph[i]` lists the neighbors of node `i`, and nodes are numbered from 0.
The graph is undirected and has no self-loops or parallel edges.
Return any simple path, a list of nodes with no repeats, from `node1` to `node2`, or an empty list if `node2` is unreachable.
Any valid simple path is accepted.

## Examples

### Example 1

```text
Input: graph = [[1], [0, 2, 5, 4], [1, 4, 5], [], [5, 2, 1], [1, 2, 4]], node1 = 0, node2 = 4
Output: [0, 1, 4]
Explanation: [0, 1, 2, 5, 4] is also accepted.
```

### Example 2

```text
Input: graph = [[1], [0, 2, 5, 4], [1, 4, 5], [], [5, 2, 1], [1, 2, 4]], node1 = 0, node2 = 3
Output: []
```

## Constraints

- `2 <= graph.length <= 1,000` and `node1 != node2`
