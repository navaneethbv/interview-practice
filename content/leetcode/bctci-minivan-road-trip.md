# Minivan Road Trip

`times[i]` is the detour time for stopping at rest stop `i`; you start before the first stop and finish after the last.
You never want to pass more than `k` consecutive stops without stopping.
Return the least total detour time.

## Examples

### Example 1

```text
Input: times = [8, 1, 2, 3, 9, 6, 2, 4], k = 2
Output: 6
```

### Example 2

```text
Input: times = [8, 1, 2, 3, 9, 6, 2, 4], k = 3
Output: 4
```

## Constraints

- `0 <= times.length <= 1,000`
- `1 <= times[i] <= 1,000`
- `1 <= k <= 1,000`
