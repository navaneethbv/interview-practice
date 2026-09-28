# Missing Numbers in Range

Given a sorted array `arr` and a range `[low, high]`, return every integer in the range that does not appear in `arr`, in increasing order.

## Examples

### Example 1

```text
Input: arr = [6, 9, 12, 15, 18], low = 9, high = 13
Output: [10, 11, 13]
```

### Example 2

```text
Input: arr = [], low = 9, high = 9
Output: [9]
```

## Constraints

- `0 <= arr.length <= 10^6`
- `-10^9 <= low <= high <= 10^9` and `high - low <= 10^6`
- `arr` is sorted in ascending order and may contain duplicates or values outside the range.
