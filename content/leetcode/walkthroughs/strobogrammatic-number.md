## Intuition

Rotation reverses the digit order and maps each digit to its rotated partner.
The only valid pairs are 0 with 0, 1 with 1, 8 with 8, 6 with 9, and 9 with 6.
Checking the outside pair and moving inward applies both reversal and rotation at once.
Any unsupported digit or mismatched pair makes the number invalid.

## Brute force

A direct approach could build a rotated string by scanning the input backward and looking up each digit.
It would still take O(n) time and O(n) space for n digits.
The two-pointer check avoids storing the transformed string while making the same pair comparisons.

## Approach

1. Set left at the first digit and right at the last digit.
2. Look up the rotation of the left digit.
3. Reject when that rotation is absent or differs from the right digit.
4. Move both pointers inward until they cross.
5. The center digit of an odd-length input is checked against itself and therefore must be 0, 1, or 8.

## Walkthrough

For Example 1, num is 619.
The outside pair is 6 and 9, and rotating 6 gives 9.
The pointers move to the center digit 1, which rotates to itself.
Every pair matches, so the result is true.
For Example 2, num is 68.
Rotating the left digit 6 gives 9, not the right digit 8, so the result is false.

## Complexity

Each digit is checked at most once, so the time complexity is O(n).
The two-pointer algorithm uses O(1) extra space.
The lookup table has constant size independent of the input length.

## Edge cases

The one-digit values 0, 1, and 8 are valid.
The one-digit values 6 and 9 are invalid because they rotate into a different digit.
An even-length input has no center digit.
An unsupported digit returns false immediately.

## Common mistakes

Do not reverse the string without applying the digit mapping.
Do not map 6 to 6 or 9 to 9.
Do not reject a leading zero separately, because the input contract already controls formatting.
Do not compare the left and right digits without rotation.

## Language notes

Python uses a dictionary and its get method to identify unsupported digits.
Java uses parallel strings to map each allowed source digit to its rotated destination.
Both methods keep the required isStrobogrammatic signature.
