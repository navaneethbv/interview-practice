## Intuition

Long division produces one fractional digit per remainder.
If a remainder repeats, the following digits repeat from the earlier digit position, so parentheses mark that interval.

## Brute force

Generating digits without remembering remainders can run forever on repeating fractions.
A remainder map detects the cycle exactly.

## Approach

1. Handle zero and determine the sign using widened absolute values.
2. Append the integer quotient and process the fractional remainder.
3. Store each remainder's digit position before multiplying by ten.
4. On repetition, insert `(` at the first position and append `)`.

## Walkthrough

For Example 1, 1 divided by 2 gives whole part 0 and remainder 1.
Multiplying by 10 produces digit 5 and remainder 0, so the result is `0.5`.
For 2 divided by 3, remainder 2 produces digit 6 and returns to remainder 2, so the repeating output is `0.(6)`.

## Complexity

There are at most |denominator| distinct nonzero remainders, so time and map space are O(|denominator|), plus output length.
Python stores digit strings in a list; Java appends to `StringBuilder` and maps `long` remainders.

## Edge cases

Zero numerator returns `0` without a decimal point.
Terminating fractions stop at remainder zero.
Widen before taking absolute value so the minimum signed integer is safe in Java.

## Common mistakes

Record the remainder before producing its next digit.
Put the sign only once.
Do not parenthesize a terminating suffix.

## Language notes

Python joins a digit list after inserting parentheses.
Java inserts the opening parenthesis into the builder at the saved output index.
