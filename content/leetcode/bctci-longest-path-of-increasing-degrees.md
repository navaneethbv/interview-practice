# Longest Path of Increasing Degrees

An undirected graph has `V` nodes numbered from 0 and the given edges, with no self-loops or repeated edges.
Find the longest path in which each node has a strictly higher degree than the node before it, and return its number of nodes.

## Examples

### Example 1

```text
Input: V = 8, edges = [[0, 1], [1, 2], [2, 3], [0, 2], [0, 4], [2, 6], [3, 7], [2, 7], [4, 5], [5, 6], [6, 7]]
Output: 3
Explanation: 5, 6, 2 have degrees 2, 3, and 5.
```

### Example 2

```text
Input: V = 1, edges = []
Output: 1
```

## Constraints

- `1 <= V <= 10^5` and at most `10^6` edges.
