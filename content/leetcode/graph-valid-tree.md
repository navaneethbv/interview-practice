# Graph Valid Tree

Return whether the undirected graph on vertices 0 through `n - 1` is a tree.
A tree is connected and has no cycles.

## Examples

### Example 1

```text
Input: n = 4, edges = [[0, 1], [1, 2], [1, 3]]
Output: true
Explanation: All four vertices are connected without a cycle.
```

### Example 2

```text
Input: n = 3, edges = [[0, 1], [1, 2], [2, 0]]
Output: false
Explanation: The three edges form a cycle.
```

## Constraints

- 1 <= n <= 2000.
- Edges join distinct valid vertices, with no duplicate undirected edges.
- 0 <= edges.length <= 5000.
