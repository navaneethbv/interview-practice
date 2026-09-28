# Count Subarrays With Exactly k Bad Days

A bad day has fewer than 10 sales and a good day has at least 10.
Return how many subarrays contain exactly `k` bad days.

## Examples

### Example 1

```text
Input: sales = [0, 20, 5], k = 1
Output: 4
```

### Example 2

```text
Input: sales = [0, 5, 8], k = 2
Output: 2
```

## Constraints

- `0 <= sales.length <= 10^5`
- `0 <= sales[i] < 10^3`
- `0 <= k <= 10^5`
