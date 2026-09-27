# Find the City With the Smallest Number of Neighbors at a Threshold Distance

Cities 0 through n - 1 are joined by undirected weighted edges `[a, b, distance]`.
For each city, count other cities reachable along a path of total distance at most distanceThreshold.
Return the city with the smallest count; break ties by choosing the largest city number.

## Examples

### Example 1

```text
Input: n = 4, edges = [[0, 1, 3], [1, 2, 1], [1, 3, 4], [2, 3, 1]], distanceThreshold = 4
Output: 3
Explanation: Cities 0 and 3 reach the fewest neighbors; the larger index wins.
```

### Example 2

```text
Input: n = 3, edges = [], distanceThreshold = 5
Output: 2
Explanation: Every city reaches zero neighbors, so choose 2.
```

## Constraints

- 2 <= n <= 100.
- Edges join distinct cities and have positive weights at most 10000.
- There are no duplicate undirected edges.
- 1 <= distanceThreshold <= 10000.
