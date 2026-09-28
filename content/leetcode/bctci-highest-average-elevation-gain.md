# Highest Average Elevation Gain

A graph has `V` nodes numbered from 0, and each `edges[i] = [a, b, gain]` is an undirected edge with an elevation gain.
The average gain of a connected component is the mean gain of its edges, or 0 if it has none.
Return the largest average gain of any component; answers within `10^-6` are accepted.

## Examples

### Example 1

```text
Input: V = 4, edges = [[0, 1, 3], [1, 2, 2], [2, 3, 1], [3, 0, 2]]
Output: 2.0
```

### Example 2

```text
Input: V = 6, edges = [[0, 1, 1], [1, 2, 2], [3, 4, 3], [4, 5, 5]]
Output: 4.0
```

## Constraints

- `1 <= V <= 1,000`
- `0 <= edges.length <= 10^5` and `0 <= gain <= 10^9`
