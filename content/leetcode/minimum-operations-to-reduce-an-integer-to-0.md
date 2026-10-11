# Minimum Operations to Reduce an Integer to 0

In one operation you may add or subtract any power of two to `n`.
Return the minimum number of operations needed to make `n` equal to 0.

## Constraints

- 1 <= n <= 10^5

## Examples

### Example 1

```text
Input: n = 39
Output: 3
Explanation: 39 + 1 = 40, 40 - 8 = 32, 32 - 32 = 0.
```

### Example 2

```text
Input: n = 54
Output: 3
Explanation: 54 + 2 = 56, 56 + 8 = 64, 64 - 64 = 0.
```
