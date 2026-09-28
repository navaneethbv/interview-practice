# Road Trip

`times[i]` is the detour time for stopping at rest stop `i`; you start before the first stop and finish after the last.
You never want to pass more than 2 consecutive stops without stopping.
Return the least total detour time.

## Examples

### Example 1

```text
Input: times = [8, 1, 2, 3, 9, 6, 2, 4]
Output: 6
```

### Example 2

```text
Input: times = [10, 10]
Output: 0
```

## Constraints

- `0 <= times.length <= 10^6`
- `1 <= times[i] <= 10^3`
