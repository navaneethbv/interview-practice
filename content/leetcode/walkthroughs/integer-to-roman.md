## Intuition

Roman numerals are built from the largest valid symbol values downward.
The table includes subtractive symbols such as CM and XL before their component symbols.
Taking as many copies as fit at each table entry leaves a smaller remainder for later entries.

## Brute force

One naive option could enumerate every legal Roman numeral until its numeric value reaches num.
That grows unnecessarily with the input and makes the conversion depend on a large search space.
Greedy value selection uses the ordered numeral rules directly.

## Approach

1. Keep values and symbols in descending order, including all subtractive pairs.
2. Divide the remaining number by the current value to find its repeat count.
3. Append that symbol repeated count times.
4. Keep the remainder and continue through smaller values.
5. Join the pieces into the final numeral.

## Walkthrough

Example 1 converts 44.
The 1000, 500, 100, and 90 entries do not fit.
The 50 entry also does not fit, but 40 fits once, so the result starts with XL and the remainder is 4.
The 4 entry contributes IV and leaves zero.
The final result is XLIV.

## Complexity

The numeral table has fixed size thirteen, so the algorithm performs O(1) table work under the problem's bounded integer range.
If L is the output length, appending the symbols takes O(L) time and the returned string takes O(L) space.
The algorithm uses O(1) auxiliary table and counter space beyond the output.
Python's list of pieces and Java's StringBuilder both store output components before joining or returning.

## Edge cases

A value such as 4 must use IV rather than four I symbols.
A value such as 900 must use CM rather than DCCCC.
Thousands can repeat M within the stated input range.
The input is assumed to be a valid positive integer in the statement's supported range.

## Common mistakes

- Putting 4 after 5 in the table emits V followed by invalid subtraction.
- Processing one-symbol values before subtractive pairs loses canonical notation.
- Forgetting to update the remainder repeats symbols too many times.
- Returning table labels without respecting their counts ignores the numeric value.

## Language notes

Python uses divmod to obtain both the count and remainder in one step.
Java loops while a value fits because the StringBuilder can append each symbol directly.
The fixed arrays and list are local to the conversion call, so no state leaks between calls.
