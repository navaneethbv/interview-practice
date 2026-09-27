## Intuition

Read the decimal digits from right to left and append each digit to reversed.
The result must be checked before multiplication so a 32-bit overflow never occurs.
Comparing against the positive and negative endpoint digits handles the asymmetric limits.

## Brute force

Converting through a wide numeric type can be simple, but it violates the requirement to avoid 64-bit storage.
String reversal uses extra memory and must still perform a range check.
The Java reference performs arithmetic with an explicit pre-multiplication guard, while the Python reference compares reversed text with the endpoint.

## Approach

1. Extract the last digit with remainder by 10.
2. Remove that digit from x by integer division.
3. Call wouldOverflow before appending the digit.
4. Return zero if the append would exceed the signed 32-bit range.
5. Otherwise update reversed and continue.

## Walkthrough

Example 1 has x = 120.
The first digit is 0, then 2, then 1.
Appending them produces 0, 2, and 21, so the returned value is 21.
Leading zeroes disappear naturally through multiplication by 10.

## Complexity

- Time: O(log |x|), for one step per decimal digit.
- Space: O(log |x|) for Python's digit text and O(1) for Java's arithmetic reference.

## Edge cases

Zero returns zero because the loop has no digits to append.
Negative values retain their sign because Java remainder and division preserve it.
Integer minimum needs the negative limit of -2147483648.
An overflow at any intermediate append returns zero immediately.

## Common mistakes

- Checking overflow after multiplication can already overflow the integer.
- Using only the positive limit rejects or accepts the wrong negative endpoint.
- Treating the minus sign as a digit reverses the sign.
- Forgetting leading zero removal changes 120 into a different textual result.

## Language notes

Java uses wouldOverflow with integer bounds before updating reversed.
Python uses arbitrary-precision text conversion and compares against the matching endpoint string.
Both preserve the same signed result contract.
