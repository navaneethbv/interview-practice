## Intuition

Appending the binary digits of value is equivalent to shifting the current result left by value's bit length and adding value.
The bit length increases exactly at powers of two.

## Brute force

Building a large binary string and converting it at the end uses memory proportional to the entire concatenation.
The rolling modular value keeps only the required residue.

## Approach

1. Track the current binary bit length.
2. Increase it when the next value is a power of two.
3. Shift the result by that length, add the value, and reduce modulo 1,000,000,007.
4. Return the final residue.

## Walkthrough

For Example 1, n=3.
Start with 1, then append binary 10 by shifting 1 left two places and adding 2, giving 6.
Append binary 11 by shifting 6 left two places and adding 3, giving 27.
The result is 27.

## Complexity

The loop performs O(n) arithmetic iterations and uses O(1) auxiliary variables.
The Python integer is reduced modulo the constant each step, while Java keeps the residue in a `long` so the shift and addition fit before reduction.
The returned value is an `int`.

## Edge cases

n=1 returns 1.
Powers of two are where the shift width increases.
Modulo reduction must happen after every append to prevent growth.

## Common mistakes

Use the new number's bit length, not the previous one.
Detect powers of two with `value & (value - 1) == 0`.
Do not concatenate decimal strings.

## Language notes

Python's `range` includes n with `n + 1`.
Java uses a `long` accumulator and casts only the final modular result.
