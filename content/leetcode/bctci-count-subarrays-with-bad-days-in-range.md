# Count Subarrays With Bad Days in Range

A bad day has fewer than 10 sales and a good day has at least 10.
Return how many subarrays contain at least `k1` and at most `k2` bad days.

## Examples

### Example 1

```text
Input: sales = [0, 20, 5], k1 = 1, k2 = 2
Output: 5
```

### Example 2

```text
Input: sales = [10, 20, 30], k1 = 1, k2 = 2
Output: 0
```

## Constraints

- `0 <= sales.length <= 10^5`
- `0 <= sales[i] < 10^3`
- `0 <= k1 <= k2 <= 10^5`
