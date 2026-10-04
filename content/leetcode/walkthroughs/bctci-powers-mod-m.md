## Intuition

Squaring a half-power recovers an even exponent, and an odd exponent needs one additional factor of a.
Reducing each intermediate product modulo m preserves the final remainder while preventing the full exponential-size integer from being constructed.
The exponent is halved at every recursive call.

## Brute force

Multiply by a exactly p times, reducing after each multiplication.
That keeps numbers bounded but still takes O(p) multiplications, too many for a billion-sized exponent.

## Approach

For exponent zero, return `1 % m`.
Otherwise recursively calculate `half`, the remainder for exponent `p // 2`.
Square that value and reduce modulo m.
If p is odd, multiply the result by `a % m` and reduce again.
Return the resulting remainder.
Only one recursive half-power is computed, then reused for both factors of the square.
The modular multiplication identity justifies reducing operands before later multiplications.
The implementation bounds products by roughly m squared rather than constructing a to the power p.

## Walkthrough

Example 1 requests 2 to the fifth power modulo 30.
The recursive exponent sequence is 5, 2, 1, 0.
The zero exponent returns 1, and the exponent-one state returns 2.
The exponent-two state squares 2 to obtain 4.
The exponent-five state squares 4 to obtain 16, then applies its extra factor of 2.
Reducing 32 modulo 30 produces the final answer 2.

## Complexity

There are O(log(p + 1)) recursive levels and constant arithmetic per level.
Both references therefore use O(log(p + 1)) time and stack space under bounded-width arithmetic.
They do not use constant stack space, since the implementation is recursive.

## Edge cases

Exponent zero returns one because m exceeds one.
If a is divisible by m, every positive exponent returns zero.

## Common mistakes

Calling the half-power function twice would destroy the logarithmic recurrence.
Do not omit the extra factor for odd exponents.

## Language notes

Python supports arbitrary-precision products.
Java stores products in `long`; with m at most one billion, the squared reduced values fit before the modulo operation.
