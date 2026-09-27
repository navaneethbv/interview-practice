# Number of Connected Components in an Undirected Graph

Count the connected components of an undirected graph with vertices 0 through `n - 1`.
Two vertices belong to the same component when a path joins them.
An isolated vertex counts as one component.

## Examples

### Example 1

```text
Input: n = 5, edges = [[0, 1], [1, 2], [3, 4]]
Output: 2
Explanation: Vertices 0, 1, 2 form one component and 3, 4 form another.
```

### Example 2

```text
Input: n = 3, edges = []
Output: 3
Explanation: Each vertex is isolated.
```

## Constraints

- 1 <= n <= 2000.
- Edges join distinct valid vertices, with no duplicate undirected edges.
- 0 <= edges.length <= 5000.
