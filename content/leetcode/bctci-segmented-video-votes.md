# Segmented Video Votes

A video is `n` minutes long, and each vote `[l, r, v]` adds `v` (1 or -1) to every minute from `l` to `r` inclusive.
Return the net vote count of every minute.

## Examples

### Example 1

```text
Input: n = 6, votes = [[3, 4, 1], [0, 0, 1], [1, 3, 1], [0, 5, -1]]
Output: [0, 0, 0, 1, 0, -1]
```

### Example 2

```text
Input: n = 2, votes = []
Output: [0, 0]
```

## Constraints

- `1 <= n <= 10^5` and `0 <= votes.length <= 10^5`
