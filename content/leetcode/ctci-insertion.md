# Insertion

Two non-negative 32-bit integers `N` and `M` and two bit positions `i <= j` are given.
Replace bits `i` through `j` of `N` with the bits of `M`, so that `M` starts at bit `i`, and return the result.
`M` always fits in the `j - i + 1` bits available; any higher bits it lacks are written as zeros.

## Examples

### Example 1

```text
Input: N = 1024, M = 19, i = 2, j = 6
Output: 1100
Explanation: 10000000000 with 10011 written into bits 2 to 6 is 10001001100.
```

### Example 2

```text
Input: N = 255, M = 0, i = 0, j = 3
Output: 240
```

## Constraints

- `0 <= N, M <= 2^31 - 1`
- `0 <= i <= j <= 30`
- `M < 2^(j - i + 1)`
