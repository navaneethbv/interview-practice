# Divide Two Integers

Return integer division truncated toward zero without using multiplication, division, or remainder operators.
Clamp an overflowing result to the signed 32-bit range.

## Examples

### Example 1

```text
Input: dividend = 10, divisor = 3
Output: 3
Explanation: Discard the fractional part of 10 divided by 3.
```

### Example 2

```text
Input: dividend = 7, divisor = -3
Output: -2
Explanation: Truncation moves the negative quotient toward zero.
```

## Constraints

- -2^31 <= dividend, divisor <= 2^31 - 1
- divisor is nonzero.
