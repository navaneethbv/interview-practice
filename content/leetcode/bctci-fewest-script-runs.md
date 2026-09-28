# Fewest Script Runs

Each meeting `[l, r]` with `l < r` is captured by a script run at any time from `l` to `r` inclusive.
Return the fewest script runs that capture every meeting.

## Examples

### Example 1

```text
Input: meetings = [[2, 3], [1, 4], [2, 3], [3, 6], [8, 10]]
Output: 2
```

### Example 2

```text
Input: meetings = []
Output: 0
```

## Constraints

- `0 <= meetings.length <= 10^5`
- `0 <= l < r <= 10^9`
