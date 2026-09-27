## Intuition

A number is a palindrome when its left and right halves match in reverse order.
Reverse only the lower half of the digits, stopping when that reversed half is at least as long as the remaining number.
Even-length numbers compare the two halves directly, while odd-length numbers ignore the middle digit.

## Brute force

Converting the integer to a decimal string and comparing it with its reverse takes O(d) time and O(d) space for d digits.
Reversing the entire integer numerically also works, but it performs unnecessary work and can overflow in fixed-width languages.

## Approach

1. Reject negative values and nonzero values ending in zero.
2. While `x > reversed_half`, append the final digit of `x` to `reversed_half` and remove it from `x`.
3. Return true when `x == reversed_half` for even length or `x == reversed_half // 10` for odd length.

## Walkthrough

Example 1 starts with `x = 121` and `reversed_half = 0`.

| step | remaining `x` | `reversed_half` |
| ---: | ---: | ---: |
| 1 | 12 | 1 |
| 2 | 1 | 12 |

The original middle digit is the final digit of `reversed_half`, so `1 == 12 // 10` and the result is true.

## Complexity

- Time: O(d), where d is the number of decimal digits, because at most half the digits are moved.
- Space: O(1), using two integer variables independent of d.

## Edge cases

Negative numbers are immediately false.
Zero is a palindrome, while values such as 10 are false because their reverse would have a leading zero.
Single-digit values finish after one comparison.
The half-reversal avoids constructing a full reversed integer.

## Common mistakes

- Reversing all digits risks overflow in languages with fixed-width integers.
- Treating every number ending in zero as false incorrectly rejects zero itself.
- Comparing only `x == reversed_half` misses odd-length palindromes.

## Language notes

Python integer division uses `//`, while Java uses integer `/` for the same positive values.
Java's `int` remains safe because only half the digits are reversed.
The references use arithmetic rather than strings in both languages.
