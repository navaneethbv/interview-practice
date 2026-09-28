# Adjacency List Validation

Return whether `graph` is a valid adjacency list of an undirected graph with `V = graph.length` nodes:

- every neighbor is between 0 and `V - 1`;
- no node lists itself;
- no node lists the same neighbor twice;
- whenever `b` appears in `graph[a]`, `a` also appears in `graph[b]`.

## Examples

### Example 1

```text
Input: graph = [[1], [0]]
Output: true
```

### Example 2

```text
Input: graph = [[1, 1], [0, 0]]
Output: false
```

## Constraints

- `0 <= graph.length <= 1,000`
- `0 <= graph[i].length <= 1,000`
