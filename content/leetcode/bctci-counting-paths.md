# Counting Paths

`graph` is the adjacency list of an unweighted directed acyclic graph: `graph[i]` lists the nodes that node `i` has edges to.
Return an array whose entry `i` is the number of distinct paths from `start` to node `i`, modulo `1,000,000,007`.
The empty path counts, so the entry for `start` is 1.

## Examples

### Example 1

```text
Input: graph = [[1], [], [1], [4], [1, 2, 5], [2]], start = 4
Output: [0, 3, 2, 0, 1, 1]
```

### Example 2

```text
Input: graph = [[]], start = 0
Output: [1]
```

## Constraints

- `1 <= V <= 10^5` and at most `10^6` edges.
