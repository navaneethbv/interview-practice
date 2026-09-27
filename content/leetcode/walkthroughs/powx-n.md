## Intuition

Repeated multiplication uses one factor per exponent unit, which is too slow for a large exponent.
Binary exponentiation squares `x` after each bit of `n`, and multiplies the result only when that bit is one.
For a negative exponent, invert the base first and work with the positive magnitude.

## Brute force

Multiplying `x` by itself `abs(n)` times takes O(abs(n)) time.
That is infeasible when the exponent is near the 32-bit limit, while squaring reduces the number of iterations to the number of exponent bits.

## Approach

1. If `n` is negative, replace `x` with `1 / x` and negate `n`.
2. While `n` is nonzero, multiply `result` by `x` when its low bit is one.
3. Square `x` and shift `n` right by one bit.
4. Return `result` after all exponent bits are consumed.

## Walkthrough

Example 1 computes `x = 2.0` and `n = 10`, whose binary form is 1010.

| current power bits | `x` before square | action | `result` |
| --- | ---: | --- | ---: |
| 1010 | 2 | low bit 0, skip | 1 |
| 0101 | 4 | low bit 1, multiply | 4 |
| 0010 | 16 | low bit 0, skip | 4 |
| 0001 | 256 | low bit 1, multiply | 1024 |

The final result is 1024.0.

## Complexity

- Time: O(log abs(n)) multiplications, with a constant-time result for n = 0.
- Space: O(1), using a fixed number of numeric variables.

## Edge cases

Exponent zero returns 1.0 for the valid nonzero-base cases in the statement.
The minimum signed exponent is safe in Java because `n` is copied to a `long` before negation.
Negative bases naturally produce the correct sign through multiplication.
Negative exponents invert the base before processing bits.

## Common mistakes

- Negating a Java `int` minimum value overflows before the loop starts.
- Multiplying the result on every iteration without checking the low bit produces the wrong exponent product.
- Forgetting to square the base after consuming a bit misaligns later factors.

## Language notes

Python integers handle the exponent magnitude directly.
Java uses `long power` to represent `-Integer.MIN_VALUE` safely.
Python uses `float` multiplication and Java uses `double`, both binary floating-point types.
The judge permits its specified numerical tolerance because multiplication can round.
