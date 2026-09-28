## Intuition

The next larger number must change the rightmost possible digit, then make the suffix as small as possible.
This is the next-permutation operation: find a pivot that can increase, swap it with the smallest larger suffix digit, and reverse the suffix.

## Brute force

Generating every digit permutation and selecting the next value is factorial in the number of digits.
Sorting or scanning candidate integers also ignores the fact that only a small suffix must change.

## Approach

1. Convert the number to a digit array and scan from the right for the first `pivot` where the digit is smaller than its successor.
2. If no pivot exists, the digits are nonincreasing and no larger permutation is possible.
3. Scan from the right for the first digit greater than the pivot, swap them, and reverse the suffix.
4. Parse the result with a wide type and reject values above the signed 32-bit maximum.

## Walkthrough

For Example 1, `n = 1243`, the right-to-left scan skips 4 because `4` is greater than 3, then finds pivot 2 because `2 < 4`.
The rightmost digit greater than 2 is 3, so swapping gives `1342`.
Reversing the suffix after the pivot changes `42` to `24`, producing `1324`.
That is the smallest permutation larger than 1243, matching Example 1.

## Complexity

The digit scans and suffix reversal are linear in the number of digits, so time is O(d).
The digit array and resulting string use O(d) space.

## Edge cases

A descending digit sequence such as 321 has no pivot and returns -1.
Repeated digits are handled by the strict comparisons, which preserve the smallest possible increase.
Java parses into `long` before comparing with `Integer.MAX_VALUE` to avoid overflow.

## Common mistakes

Choose the rightmost valid pivot, not the first from the left.
Choose the rightmost digit greater than the pivot because the suffix is nonincreasing.
Reverse the suffix after swapping instead of sorting it with a larger-than-needed order.

## Language notes

Python uses string digits and a slice assignment with `reversed`, while Java reverses a `char[]` in place.
Both preserve the required `Solution.nextGreaterElement` signature and apply the 32-bit limit after construction.
