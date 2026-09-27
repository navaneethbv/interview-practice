## Intuition

A valid number has an optional sign, a decimal mantissa, and an optional signed exponent.
The mantissa needs at least one digit across its two sides of the decimal point.
The exponent, when present, needs at least one digit and cannot contain a decimal point.

## Brute force

A naive checker could try to parse the string with a floating-point conversion and inspect whether it consumed all input.
That accepts or rejects according to language-specific formats and can allow values outside the problem grammar.
The explicit scanner checks each permitted grammar piece in order and rejects any leftover character.

## Approach

1. Consume an optional sign before the mantissa.
2. Count digits before an optional decimal point.
3. Consume the decimal point and count digits after it.
4. Reject when both mantissa digit counts are zero.
5. If an exponent appears, consume its optional sign and require one or more digits.
6. Return true only when the scan ends exactly at the string length.

## Walkthrough

Example 1 is -.75e+2.
The initial sign is consumed.
There are zero digits before the decimal point, then two digits after it, so the mantissa is valid.
The scanner consumes e and its plus sign, then reads exponent digit 2.
It reaches the end, so the result is true.

## Complexity

For n characters, every character is consumed at most once, giving O(n) time.
The scanner uses O(1) auxiliary space.
It does not convert the value to floating point, so the complexity and result do not depend on numeric magnitude.
The input contract supplies the string, and no output allocation is needed.

## Edge cases

A decimal such as .5 is valid because digits exist after the point.
A decimal such as 5. is valid because digits exist before the point.
An exponent cannot appear without a valid mantissa and at least one exponent digit.
Extra letters, spaces, or a second exponent leave unconsumed input and return false.

## Common mistakes

- Requiring digits on both sides of the decimal rejects valid forms such as .75.
- Accepting an exponent sign without digits accepts incomplete notation.
- Parsing only a prefix allows trailing junk.
- Treating uppercase E differently from lowercase e rejects valid exponent notation.

## Language notes

Python compares against ASCII digit bounds for the input grammar supplied by the judge.
Java uses an ASCII digit helper to mirror the documented numeric characters.
Both scanners avoid regular-expression engine behavior and make each grammar transition visible.
