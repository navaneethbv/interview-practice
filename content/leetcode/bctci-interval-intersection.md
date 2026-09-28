# Interval Intersection

An interval `[start, end]` includes both endpoints.
Each of `arr1` and `arr2` is sorted, and within each array no two intervals overlap or even share an endpoint.
Return the sorted list of intervals covering exactly the points that belong to both arrays.

## Examples

### Example 1

```text
Input: arr1 = [[0, 1], [4, 6], [7, 8]], arr2 = [[2, 3], [5, 9], [10, 11]]
Output: [[5, 6], [7, 8]]
```

### Example 2

```text
Input: arr1 = [[2, 4], [5, 8]], arr2 = [[3, 3], [4, 7]]
Output: [[3, 3], [4, 4], [5, 7]]
```

## Constraints

- `0 <= arr1.length, arr2.length <= 10^6`
- `-10^9 <= start <= end <= 10^9`
