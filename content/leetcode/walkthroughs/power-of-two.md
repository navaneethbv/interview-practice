## Intuition

A positive power of two has exactly one set bit in binary.
Subtracting one from that value changes the set bit to zero and turns every lower bit into one.
The bitwise AND of those two values is therefore zero.
Any positive number with multiple set bits shares at least one bit with one less than itself.

## Brute force

A repeated-division approach could divide n by two whenever it is even and reject an odd remainder.
That takes O(log n) time and constant space.
The bit test performs the same test in constant time for a fixed-width integer.

## Approach

1. First require n to be positive, because zero and negative integers are not powers of two in this problem.
2. Evaluate n AND n minus one.
3. Return true exactly when that expression is zero.
4. The positive guard also avoids treating zero as a special one-bit value.

## Walkthrough

For Example 1, n is 32, whose binary form is 100000.
Subtracting one gives 011111.
Their AND is zero, so the result is true.
For Example 2, 12 is 001100 and 11 is 001011.
Their AND is nonzero, so 12 is not a power of two.

## Complexity

The bit operation takes O(1) time and O(1) extra space on the fixed-width Java integer.
Python integers use variable-size storage, so the operation costs O(w) for w machine words in the general model.
Under the signed 32-bit input constraint, w is bounded by a constant.

## Edge cases

One is a power of two because it is 2 to the zero power.
Zero returns false through the positivity check.
Negative values return false before the bit test.
The largest signed positive power of two in the tests is handled directly.

## Common mistakes

Do not omit the positive check, because zero also satisfies zero AND negative one in some representations.
Do not use a decimal logarithm, which introduces rounding concerns.
Do not test divisibility by two only once.

## Language notes

Python's comparison and bitwise expression implements the same identity using arbitrary-precision integers.
Java evaluates the identity on a signed int after the positive guard.
Both methods retain the required isPowerOfTwo signature.
