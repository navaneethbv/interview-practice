# DAG Path Reconstruction

A directed acyclic graph has `V` nodes numbered from 0, and each `edges[i] = [u, v, w]` is an edge from `u` to `v` with integer weight `w`, which may be negative.
Return a shortest path from `start` to `goal` as a list of nodes, or an empty list if `goal` is unreachable.
Any shortest path is accepted.

## Examples

### Example 1

```text
Input: V = 6, edges = [[0, 1, 10], [2, 1, 10], [3, 4, 12], [4, 1, 11], [4, 2, 21], [4, 5, 14], [5, 2, -30]], start = 4, goal = 1
Output: [4, 5, 2, 1]
```

### Example 2

```text
Input: V = 6, edges = [[0, 1, 10], [2, 1, 10], [3, 4, 12], [4, 1, 11], [4, 2, 21], [4, 5, 14], [5, 2, -30]], start = 4, goal = 3
Output: []
```

## Constraints

- `1 <= V <= 10^5` and `0 <= edges.length <= 10^6`
- There is at most one edge from any node to another.
