# Flip Bit to Win

You may flip exactly one bit of a 32-bit integer from 0 to 1.
Return the length of the longest run of consecutive 1 bits you can create.
The integer is treated as 32 bits in two's complement, so a negative input has its sign bit set.
If every bit is already 1, the answer is 32.

## Examples

### Example 1

```text
Input: n = 1775
Output: 8
Explanation: 1775 is 11011101111; flipping the zero at bit 4 joins runs of 3 and 4 ones.
```

### Example 2

```text
Input: n = 0
Output: 1
```

## Constraints

- `-2^31 <= n <= 2^31 - 1`
