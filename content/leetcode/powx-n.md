# Pow(x, n)

Compute `x` raised to the integer power `n`.
A negative exponent means the reciprocal of the corresponding positive power.

## Examples

### Example 1

```text
Input: x = 2.0, n = 10
Output: 1024.0
Explanation: Multiply ten factors of 2.
```

### Example 2

```text
Input: x = 2.0, n = -2
Output: 0.25
Explanation: Take the reciprocal of 2 squared.
```

## Constraints

- -100 < x < 100
- -2^31 <= n <= 2^31 - 1
- x is nonzero when n <= 0.
- The result is finite and has absolute value at most 10,000.
