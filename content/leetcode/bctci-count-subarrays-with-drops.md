# Count Subarrays With Drops

A drop is a pair of adjacent numbers where the first is larger than the second.
Return `[atMost, exactly, atLeast]`: the numbers of subarrays with at most `k`, exactly `k`, and at least `k` drops.

## Examples

### Example 1

```text
Input: arr = [3, 2, 1], k = 1
Output: [5, 2, 3]
```

### Example 2

```text
Input: arr = [5, 4, 3, 2, 1], k = 2
Output: [12, 3, 6]
```

## Constraints

- `0 <= arr.length <= 10^5`
- `-10^9 <= arr[i] <= 10^9`
- `0 <= k <= 10^5`
