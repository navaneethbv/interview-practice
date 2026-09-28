# Smallest Range With k Elements

Return `[low, high]` with `low <= high` minimizing `high - low` such that at least `k` elements of `arr` lie in `[low, high]`.
If several ranges tie, return the one with the smallest `low`.

## Examples

### Example 1

```text
Input: arr = [1, 2, 5, 7, 8], k = 3
Output: [5, 8]
```

### Example 2

```text
Input: arr = [5, 5, 2, 2, 8, 8], k = 3
Output: [2, 5]
```

## Constraints

- `1 <= k <= arr.length <= 10^5`
- `-10^9 <= arr[i] <= 10^9`
