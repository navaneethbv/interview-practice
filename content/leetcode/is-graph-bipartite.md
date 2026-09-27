# Is Graph Bipartite?

Determine whether the vertices of an undirected graph can be divided into two groups so every edge joins different groups.
The adjacency list may describe a disconnected graph; every component must satisfy the rule.

## Constraints

- There are 1 to 100 vertices.
- Adjacency lists contain valid distinct neighbors, with no self-loops.
- Each edge appears in both directions.

## Examples

### Example 1

```text
Input: graph = [[1, 3], [0, 2], [1, 3], [0, 2]]
Output: true
Explanation: Opposite vertices of the four-cycle can share a group.
```

### Example 2

```text
Input: graph = [[1, 2], [0, 2], [0, 1]]
Output: false
Explanation: A three-cycle cannot be two-colored.
```
