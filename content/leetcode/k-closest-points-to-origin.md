# K Closest Points to Origin

Return the k input points closest to the origin `[0, 0]` by Euclidean distance.
The selected collection is guaranteed to be unique, though you may return its points in any order.
Coordinates inside each point must remain in x, y order.

## Examples

### Example 1

```text
Input: points = [[1, 2], [5, 5], [-1, 0]], k = 2
Output: [[-1, 0], [1, 2]]
Explanation: Squared distances are 5, 50, and 1.
```

### Example 2

```text
Input: points = [[3, 4]], k = 1
Output: [[3, 4]]
Explanation: The only point is selected.
```

## Constraints

- 1 <= k <= points.length <= 10000.
- -10000 <= x, y <= 10000.
- No tie at the kth-distance boundary makes the selected collection ambiguous.
