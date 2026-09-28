# Longest Alternating Sequence

A bad day has fewer than 10 sales and a good day has at least 10.
Return the length of the longest run of consecutive days that alternates between good and bad days.
A single day counts as a run of length 1.

## Examples

### Example 1

```text
Input: sales = [8, 9, 20, 0, 9]
Output: 3
```

### Example 2

```text
Input: sales = [5, 10, 5, 10]
Output: 4
```

## Constraints

- `0 <= sales.length <= 10^5`
- `0 <= sales[i] <= 10^3`
