# Maximum With at Most 3 Bad Days

A bad day has fewer than 10 sales and a good day has at least 10.
Return the length of the longest run of consecutive days containing at most 3 bad days.

## Examples

### Example 1

```text
Input: sales = [0, 14, 7, 9, 0, 20, 10, 0, 10]
Output: 6
```

### Example 2

```text
Input: sales = [5, 5, 5, 5]
Output: 3
```

## Constraints

- `0 <= sales.length <= 10^5`
- `0 <= sales[i] <= 10^3`
- The window may contain at most 3 bad days.
