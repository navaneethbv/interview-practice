# Next Number

Given a positive integer `n`, return `[larger, smaller]`.
`larger` is the smallest integer greater than `n` with the same number of 1 bits, and `smaller` is the largest integer less than `n` with the same number of 1 bits.
Both must be positive 32-bit signed integers; use `-1` when no such value exists.

## Examples

### Example 1

```text
Input: n = 13
Output: [14, 11]
Explanation: 13 is 1101; 14 is 1110 and 11 is 1011.
```

### Example 2

```text
Input: n = 1
Output: [2, -1]
```

## Constraints

- `1 <= n <= 2^31 - 1`
