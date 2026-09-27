## Intuition

Two strings have a common repeating base only if concatenating them in either order gives the same text.
When that condition holds, the base length is the greatest common divisor of the two lengths.

## Brute force

Trying every prefix length and checking repeated construction is O((a+b) times min(a,b)).
Most candidates are rejected after doing work that the length gcd can avoid.

## Approach

1. Compare str1 plus str2 with str2 plus str1.
2. Return empty when their order differs.
3. Compute gcd of the two lengths.
4. Return that prefix from str1.

## Walkthrough

Example 1:

For ABCABC and ABC, both concatenation orders equal ABCABCABC.
The gcd of lengths 6 and 3 is 3.
The first three characters of str1 are ABC, which is the answer.

## Complexity

The concatenation comparison takes O(a+b) time and uses O(a+b) temporary string storage.
The gcd computation is logarithmic in the lengths.
The returned prefix can require O(a+b) output storage in either language.

## Edge cases

If one string is not made from the same repeated base, the result is empty.
Identical strings return the whole string.
The empty result is distinct from a one-character base.

## Common mistakes

Do not use only length divisibility as proof of a common base.
The concatenation order test must include both orders.
Return a prefix whose length is the numeric gcd, not the shorter full string automatically.

## Language notes

Python slicing copies the returned prefix.
Java substring also produces the result string, while its gcd loop uses primitive integers.
