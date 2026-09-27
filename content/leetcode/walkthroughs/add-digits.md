## Intuition

Repeated digit sums have a compact mathematical pattern called the digital root.
Every positive integer has the same remainder modulo 9 as its repeated digit sum.
Zero is the only value whose digital root is zero.

## Brute force

A direct solution could repeatedly divide by ten, sum digits, and restart until one digit remains.
That takes O(log n) time for the input magnitude.
The modulo formula computes the same result in constant arithmetic time.

## Approach

1. Return zero when num is zero.
2. Subtract one from a positive num.
3. Take the remainder modulo 9.
4. Add one to map remainders back to the range 1 through 9.

## Walkthrough

Example 1 starts with 38.
The formula computes 1 plus 37 modulo 9.
The remainder is 1, so the result is 2.
This matches the repeated process 38 to 11 to 2.

## Complexity

The formula uses O(1) time and O(1) auxiliary space under fixed-width integer arithmetic.
No digit string or temporary list is created.
The returned result is one integer.
The arithmetic identity avoids work proportional to the number of digits.

## Edge cases

Zero returns zero rather than nine.
A one-digit positive value returns itself.
A multiple of nine returns nine.
The positive input contract makes the formula's branch explicit.

## Common mistakes

- Returning num modulo 9 maps positive multiples of 9 to zero incorrectly.
- Applying the formula to zero without a special case returns nine.
- Repeatedly converting strings is correct but loses the constant-time approach.
- Subtracting after modulo changes the digital-root mapping.

## Language notes

Python and Java use the same arithmetic expression.
Both avoid language-specific digit conversion behavior.
The method has no mutable state between calls.
