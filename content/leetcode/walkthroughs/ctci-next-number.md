## Intuition

To obtain the closest larger value with the same number of one bits, move the rightmost movable one upward and pack the remaining low ones as far right as possible.
The closest smaller value follows the mirrored rule.
Only the low runs adjacent to the pivot need to be counted.

## Brute force

Increment or decrement n until its population count matches the original.
Large gaps between qualifying values make that search much slower than inspecting the bit pattern directly.

## Approach

For `_next`, count trailing zeros and then the following run of ones.
If their combined length reaches 31, no larger positive signed 32-bit answer exists.
Otherwise the arithmetic expression moves the pivot and rebuilds the minimal lower suffix.
For `_previous`, count trailing ones, reject an all-one value, then count the following zeros.
Its arithmetic expression lowers the pivot and packs low ones as high as possible.
Return larger first and smaller second.

## Walkthrough

Example 1 uses 13, binary `1101`.
For the larger answer, trailing zeros are zero and trailing ones are one.
The formula gives `13 + 1 + 1 - 1 = 14`, binary `1110`.
For the smaller answer, there is one trailing one followed by one zero.
The formula gives `13 - 2 - 1 + 1 = 11`, binary `1011`.
Both retain three one bits.

## Complexity

Each helper scans at most B bits, taking O(B) time and O(1) space.
B is limited to 31 positive-value bits by the contract.

## Edge cases

For n equal to one, the answers are 2 and -1.
A value whose ones already occupy all lowest positions has no smaller positive counterpart.

## Common mistakes

Preserving the bit count alone is insufficient; the suffix must also be minimal or maximal to ensure the nearest answer.
Do not reverse the required output order.

## Language notes

Both references shift positive integers, so arithmetic right shift is safe.
The explicit 31-bit guard prevents constructing a larger value outside Java's positive int range.
