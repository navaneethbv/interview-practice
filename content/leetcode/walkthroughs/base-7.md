## Intuition

Repeated division by seven exposes the least significant base-7 digit first.
Collecting those remainders and reversing them constructs the representation from most significant to least significant digit.

## Brute force

Trying possible powers of seven and repeatedly subtracting them is more work and makes digit placement harder to reason about.
Repeated division performs one arithmetic step per output digit.

## Approach

1. Return `"0"` for zero.
2. Record whether the input is negative and work with its magnitude.
3. Repeatedly divide by 7, appending each remainder as a digit.
4. Reverse the digits and prepend the sign when needed.

## Walkthrough

For Example 1, `num = 100`, dividing by 7 gives quotient 14 and remainder 2.
Dividing 14 gives quotient 2 and remainder 0, then dividing 2 gives quotient 0 and remainder 2.
The collected digits are `2,0,2` from least significant to most significant, so reversing them yields `"202"`.
For -8, the magnitude produces digits `1,1`, and the negative sign is added to form `"-11"`.

## Complexity

The number of divisions equals the number of base-7 digits, so time is O(log_7 |num|).
The digit buffer uses O(log_7 |num|) space.

## Edge cases

Zero needs a special case because the division loop would otherwise produce no digits.
Multiples of seven naturally produce a zero remainder in the middle or end of the representation.
The stated range makes the magnitude safe in both references.

## Common mistakes

Do not leave the remainders in collection order, because that reverses the number.
Do not emit a separate leading zero for exact powers of seven.
Apply the sign once after converting the magnitude.

## Language notes

Python uses `divmod` and a list of strings, while Java appends remainders to `StringBuilder` and reverses it.
Java's input range avoids the `Math.abs(Integer.MIN_VALUE)` corner case.
