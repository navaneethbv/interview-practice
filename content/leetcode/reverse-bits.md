# Reverse Bits

Reverse the order of all 32 bits of `n`, including leading zeros.
The testcase input and displayed result use unsigned decimal values.
In Java, the `int` argument and return value carry the same 32-bit pattern, even when their signed interpretation is negative.

## Examples

### Example 1

```text
Input: n = 1
Output: 2147483648
Explanation: The least significant bit moves to the most significant position.
```

### Example 2

```text
Input: n = 12
Output: 805306368
Explanation: The two set bits move to positions 29 and 28.
```

## Constraints

- 0 <= the unsigned input n <= 2^32 - 1
- Exactly 32 bits must be reversed.
