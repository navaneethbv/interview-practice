# Strong Start and Ending

A bad day has fewer than 10 sales and a good day has at least 10.
You may boost `k` days by at least 20 sales each, which makes them good.
Maximize the number of consecutive good days starting at day 0 plus the number ending on the last day, counting each day at most once, so the answer is at most the number of days.

## Examples

### Example 1

```text
Input: sales = [10, 0, 0, 0, 10, 0, 0, 10], k = 2
Output: 5
```

### Example 2

```text
Input: sales = [5, 5, 5], k = 2
Output: 2
```

## Constraints

- `0 <= sales.length <= 10^5`
- `0 <= sales[i] <= 10^3`
- `0 <= k <= 10^5`
