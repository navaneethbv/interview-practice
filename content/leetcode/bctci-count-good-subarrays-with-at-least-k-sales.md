# Count Good Subarrays With at Least k Sales

A bad day has fewer than 10 sales and a good day has at least 10.
Return how many subarrays have no bad days and at least `k` total sales.

## Examples

### Example 1

```text
Input: sales = [15, 20, 5, 30, 25], k = 50
Output: 1
```

### Example 2

```text
Input: sales = [10, 20, 30], k = 40
Output: 2
```

## Constraints

- `0 <= sales.length <= 10^5`
- `0 <= sales[i] < 10^3`
- `1 <= k <= 10^7`
