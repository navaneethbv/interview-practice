## Intuition

XOR adds bits without carrying: unequal bits produce one, while equal bits produce zero.
AND identifies positions where both operands have a one, and shifting those positions left produces the carries.
Repeat this separation until there are no carries left.

## Approach

1. Use bitwise addition with `a` representing the partial sum and `b` the pending carry operand.
2. Compute `carry = (a & b) << 1` before changing either operand.
3. Replace `a` with `a ^ b` and replace `b` with `carry`.
4. Continue while `b` is nonzero.
5. In Python, mask all state to 32 bits and convert the final unsigned pattern back to a signed value.

At every step, the partial sum plus the pending carry represents the original sum modulo 2³².
Carries move left, so a fixed-width representation guarantees termination.
The input bounds ensure the requested mathematical answer also fits in this signed representation.

## Walkthrough

Example 1 adds `a = 7` and `b = 5`.
Four bits are sufficient to display these intermediate nonnegative values.

| Before `a`, `b` | XOR result | Shifted carry | Next `a`, `b` |
| --- | --- | --- | --- |
| `0111`, `0101` | `0010` | `1010` | 2, 10 |
| `0010`, `1010` | `1000` | `0100` | 8, 4 |
| `1000`, `0100` | `1100` | `0000` | 12, 0 |

With no remaining carry, return 12.
The intermediate values need not resemble ordinary decimal column addition; their combined value is what stays invariant.

## Complexity

- Time: O(1) for the fixed 32-bit representation, with at most 32 carry-propagation rounds.
- Space: O(1), retaining only fixed-width operands and a carry.

## Edge cases

Adding zero returns the other operand.
Opposite values can cancel to zero.
Negative operands need two's-complement handling, especially in Python where integer widths are not fixed.

## Common mistakes

- Computing the carry after overwriting `a` uses the wrong bits.
- Omitting Python's mask can cause negative carries to propagate indefinitely.
- Returning the unsigned Python pattern misrepresents negative answers.

## Language notes

Java `int` naturally retains the low 32 bits and interprets the result as signed.
Python uses `mask = 0xffffffff` and tests the sign bit with `0x80000000`.
For a negative final pattern, `~(a ^ mask)` restores its signed interpretation without using addition or subtraction.
