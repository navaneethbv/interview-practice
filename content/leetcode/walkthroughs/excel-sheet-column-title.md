## Intuition

Spreadsheet columns use a one-based alphabetic numeral system.
There is no zero digit, so subtract one before taking a remainder modulo 26.
The remainders are produced from right to left and must be reversed at the end.

## Brute force

A lookup table for every column number up to the input would use space proportional to the largest number.
Repeatedly subtracting 26-powered blocks can also obscure the one-based rule.
Repeated division extracts one title letter per iteration.

## Approach

1. Decrement columnNumber to convert the current one-based value.
2. Take its remainder modulo 26 and map zero through 25 to A through Z.
3. Append that letter.
4. Divide the decremented value by 26 for the next digit.
5. Reverse the collected letters.

## Walkthrough

Example 1 converts 28.
After subtracting one, 27 has remainder 1, which maps to B, leaving quotient 1.
The next iteration decrements 1 to 0, whose remainder maps to A.
The collected letters are BA from right to left, so reversal returns AB.

## Complexity

For a title of length L, the loop takes O(L) time.
The collected letters and returned string use O(L) space.
Only the current quotient and remainder are auxiliary scalars.
The title length is logarithmic in the input column number.

## Edge cases

Column 1 maps to A.
Column 26 maps to Z rather than a zero-like symbol.
Column 27 maps to AA.
The input is positive under the column contract.

## Common mistakes

- Taking modulo before subtracting one maps 26 to a nonexistent zero digit.
- Returning letters in extraction order reverses the title.
- Dividing the original value instead of the decremented value skips a place.
- Using a zero-based alphabet table without the one-based adjustment fails at multiples of 26.

## Language notes

Python uses divmod and reverses a list of characters.
Java appends to StringBuilder and calls reverse.
Both references use uppercase English letters.
