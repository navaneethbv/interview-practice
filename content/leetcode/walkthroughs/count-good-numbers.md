## Intuition

Even positions have five choices and odd positions have four choices.
The independent choices multiply, so modular exponentiation handles very large n.

## Brute force

Generating every length-n digit string takes exponential time.
It is impossible for n as large as the contract allows.

## Approach

1. Count even positions as the ceiling of n divided by two.
2. Count odd positions as the floor of n divided by two.
3. Compute 5 to the even-position count and 4 to the odd-position count with binary exponentiation.
4. Multiply the residues modulo 1,000,000,007.

## Walkthrough

Example 1:

For n 1, there is one even position and zero odd positions.
The count is 5 to the first power times 4 to the zero power, which is 5.

## Complexity

Binary exponentiation takes O(log n) time and O(1) iterative space.
Both references keep all multiplication residues modulo the constant.
Java uses long products before reducing them to prevent int overflow.

## Edge cases

For n zero outside the usual positive constraint, both exponents are zero and the empty product is one.
Odd n has one more even position than odd positions.
The returned value is always reduced modulo the required modulus.

## Common mistakes

Do not assign five choices to odd positions.
Do not use ordinary exponentiation that constructs enormous intermediate values.
Keep the exponent as long in Java because n can be up to 10 to the fifteenth.

## Language notes

Python's pow with a modulus performs modular exponentiation directly.
Java defines a small long-based binary exponentiation helper.
