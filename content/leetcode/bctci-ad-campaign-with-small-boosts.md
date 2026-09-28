# Ad Campaign With Small Boosts

A bad day has fewer than 10 sales and a good day has at least 10.
You can boost `k` different days by exactly 5 sales each, so a day with 5 to 9 sales can become good but a day with fewer than 5 cannot.
Return the longest run of consecutive good days you can create.

## Examples

### Example 1

```text
Input: sales = [10, 5, 8], k = 1
Output: 2
```

### Example 2

```text
Input: sales = [8, 4, 8], k = 3
Output: 1
```

## Constraints

- `0 <= sales.length <= 10^5`
- `0 <= sales[i] <= 10^3`
- `0 <= k <= sales.length`
