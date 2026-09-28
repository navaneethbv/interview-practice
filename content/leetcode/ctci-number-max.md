# Number Max

Return the larger of two integers without using `if`, the ternary operator, or any comparison operator.
Arithmetic and bitwise operators are allowed.

## Examples

### Example 1

```text
Input: a = 3, b = 8
Output: 8
```

### Example 2

```text
Input: a = 2147483647, b = -2147483648
Output: 2147483647
Explanation: The difference overflows 32 bits, so compute it in 64 bits.
```

## Constraints

- `-2^31 <= a, b <= 2^31 - 1`
