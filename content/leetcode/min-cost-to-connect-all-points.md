# Min Cost to Connect All Points

Connect all distinct points using undirected edges so that every point is reachable from every other point.
Connecting [x1,y1] to [x2,y2] costs |x1-x2| + |y1-y2|.
Return the minimum total edge cost needed for connectivity.

## Examples

### Example 1

```text
Input: points = [[0, 0], [2, 0], [2, 3]]
Output: 5
Explanation: Use edges of costs 2 and 3.
```

### Example 2

```text
Input: points = [[4, -2]]
Output: 0
Explanation: A single point already forms a connected network.
```

## Constraints

- 1 <= points.length <= 1,000
- Each point has two coordinates between -1,000,000 and 1,000,000.
- All points are distinct.
