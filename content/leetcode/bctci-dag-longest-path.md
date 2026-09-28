# DAG Longest Path

A directed acyclic graph has `V` nodes numbered from 0, and each `edges[i] = [u, v, w]` is an edge from `u` to `v` with integer weight `w`, which may be negative.
Return an array whose entry `i` is the length of the longest path from `start` to node `i`.
Use `-2147483648` for nodes that `start` cannot reach.

## Examples

### Example 1

```text
Input: V = 6, edges = [[0, 1, 10], [2, 1, 10], [3, 4, 12], [4, 1, 11], [4, 2, 21], [4, 5, 14], [5, 2, -30]], start = 4
Output: [-2147483648, 31, 21, -2147483648, 0, 14]
```

### Example 2

```text
Input: V = 1, edges = [], start = 0
Output: [0]
```

## Constraints

- `1 <= V <= 10^5` and `0 <= edges.length <= 10^6`
- `-10^4 <= w <= 10^4`
