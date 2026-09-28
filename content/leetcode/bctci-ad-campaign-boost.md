# Ad Campaign Boost

A bad day has fewer than 10 sales and a good day has at least 10.
An advertising campaign can boost `k` chosen days by at least 20 sales each, turning any of them into a good day.
Return the longest run of consecutive good days you can create.

## Examples

### Example 1

```text
Input: sales = [5, 0, 20, 0, 5], k = 2
Output: 3
```

### Example 2

```text
Input: sales = [0, 10, 0, 10], k = 1
Output: 3
```

## Constraints

- `0 <= sales.length <= 10^5`
- `0 <= sales[i] <= 10^3`
- `0 <= k <= sales.length`
