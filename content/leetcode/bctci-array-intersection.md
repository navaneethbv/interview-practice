# Array Intersection

Given two arrays sorted in ascending order, return their intersection in sorted order.
A value that appears `a` times in `arr1` and `b` times in `arr2` appears `min(a, b)` times in the result.

## Examples

### Example 1

```text
Input: arr1 = [1, 2, 3], arr2 = [1, 3, 5]
Output: [1, 3]
```

### Example 2

```text
Input: arr1 = [1, 1, 1], arr2 = [1, 1]
Output: [1, 1]
```

## Constraints

- `0 <= arr1.length, arr2.length <= 10^6`
- `-10^9 <= arr1[i], arr2[i] <= 10^9`
