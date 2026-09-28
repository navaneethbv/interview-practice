# Interval XOR

Intervals `a` and `b` include their left endpoint and exclude their right endpoint.
Return their symmetric difference: points belonging to exactly one interval.
Return sorted nonempty intervals, merging adjacent pieces so no result intervals share an endpoint.

## Constraints

- Both inputs contain two integers [start, end] with start < end.
- Endpoints are between -1,000,000,000 and 1,000,000,000.


## Examples

### Example 1

```text
Input: [[1, 5], [3, 8]]
Output: [[1, 3], [5, 8]]
```

### Example 2

```text
Input: [[1, 3], [3, 6]]
Output: [[1, 6]]
```
