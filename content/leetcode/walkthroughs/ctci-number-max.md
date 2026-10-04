## Intuition

The sign of a minus b tells us which input is larger.
Convert that sign into a zero-or-one selector and use arithmetic to retain exactly one input.
This implements the requested comparison without an if statement or a direct maximum operation.

## Brute force

A standard comparison followed by selecting a or b is the ordinary constant-time solution.
The reference replaces that branch with a sign-derived selector to satisfy the exercise's restricted-operation intent.
It does not claim a measured performance improvement.

## Approach

Compute the difference in a range wide enough to avoid overflow.
Extract its sign bit as `b_is_larger`: one when a is below b and zero otherwise.
Compute the complementary selector `a_is_larger = 1 ^ b_is_larger`.
Return `a * a_is_larger + b * b_is_larger`.
Exactly one selector equals one, so the sum reproduces the chosen operand rather than combining both values.
Equality selects a, which is harmless because both operands are equal.

## Walkthrough

Example 1 uses a equal to 3 and b equal to 8.
The difference is -5, so its sign-derived selector for b is one.
The selector for a is zero.
The returned arithmetic expression is `3 * 0 + 8 * 1`, which equals 8.
The calculation chooses b without evaluating a conditional branch in the selection expression.

## Complexity

For the bounded integer inputs, time and auxiliary space are O(1).
The widened difference is still a single fixed-width value in Java.
No array or bit-string representation is allocated.

## Edge cases

Equal values return that value.
When both values are negative, the less-negative value wins.
Opposite-sign extremes are especially important because their difference can exceed the signed-int range.

## Common mistakes

Computing `a - b` as a Java int before converting to long can reverse the sign through overflow.
The cast must happen before subtraction.

## Language notes

Python's arbitrary-precision difference fits comfortably within the sign test's 64-bit reasoning for int-sized inputs.
Java explicitly computes a long difference and extracts its sign with unsigned shift by 63.
