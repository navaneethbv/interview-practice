# Merge Intervals

Replace the closed intervals in `intervals` with a collection of nonoverlapping intervals that covers exactly the same points.
Intervals that overlap or share an endpoint must be combined.
The input can be in any order; return the merged intervals in any order.

## Examples

### Example 1

```text
Input: intervals = [[5, 8], [1, 3], [2, 6]]
Output: [[1, 8]]
Explanation: The overlaps connect all three intervals.
```

### Example 2

```text
Input: intervals = [[1, 2], [4, 5]]
Output: [[1, 2], [4, 5]]
Explanation: These intervals are disjoint.
```

## Constraints

- 1 <= intervals.length <= 10000.
- Every interval contains two integers with 0 <= start <= end <= 10000.
