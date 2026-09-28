# Route Between Nodes

A directed graph has nodes labeled `0` to `n - 1`, and `edges[i] = [from, to]` is a directed edge.
Return `true` when there is a route that follows edge directions from `start` to `end`.
A node always has a route to itself.

## Examples

### Example 1

```text
Input: n = 4, edges = [[0, 1], [1, 2], [3, 2]], start = 0, end = 2
Output: true
```

### Example 2

```text
Input: n = 4, edges = [[0, 1], [1, 2], [3, 2]], start = 2, end = 0
Output: false
Explanation: Edges cannot be followed backward.
```

## Constraints

- `1 <= n <= 100,000`
- `0 <= edges.length <= 200,000`
- `0 <= from, to, start, end < n`
