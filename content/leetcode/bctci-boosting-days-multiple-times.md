# Boosting Days Multiple Times

A bad day has fewer than 10 sales and a good day has at least 10.
You have `k` single-sale boosts and may use several on the same day.
Return the longest run of consecutive good days you can create.

## Examples

### Example 1

```text
Input: sales = [5, 5, 15, 0, 10], k = 12
Output: 3
```

### Example 2

```text
Input: sales = [0, 0, 0], k = 29
Output: 2
```

## Constraints

- `0 <= sales.length <= 10^5`
- `0 <= sales[i] <= 10^3`
- `0 <= k <= sales.length`
