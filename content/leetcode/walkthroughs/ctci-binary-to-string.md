## Intuition

Multiplying a fraction by two exposes its next binary digit.
If the result is at least one, that digit is one and the integral part is removed.
Otherwise the digit is zero.
Repeating this operation converts the fractional remainder directly into its binary expansion.

## Brute force

Testing many candidate bit strings against the input would explore exponentially many strings as the permitted length grows.
Repeated doubling chooses each next digit deterministically, avoiding that search altogether.

## Approach

Start with an empty `digits` collection and the input fraction as the remainder.
Before each doubling, return `ERROR` if 32 digits have already been generated and the remainder is still nonzero.
Double the remainder, append the appropriate digit, and subtract one when needed.
When the remainder reaches zero, prepend `0.` to the collected digits.
After each step, the emitted prefix represents the consumed part and the remainder describes the unrepresented suffix.

## Walkthrough

Example 1 begins with 0.625.
Doubling gives 1.25, so append 1 and keep remainder 0.25.
Doubling that gives 0.5, so append 0 and keep 0.5.
The next doubling gives 1, so append 1 and reduce the remainder to zero.
The result is `0.101`, representing one half plus one eighth.

## Complexity

For a limit B on fractional digits, time and temporary output storage are O(B).
Here B is fixed at 32, so both are bounded constants.
The `0.` prefix does not count toward the fractional-digit limit.

## Edge cases

A number terminating after exactly 32 fractional digits succeeds because the loop stops when its remainder reaches zero.
A nonzero remainder after those digits returns `ERROR`.
Inputs are strictly between zero and one.

## Common mistakes

Counting the prefix toward the limit rejects valid results prematurely.
Do not add a tolerance that silently converts a nonzero remainder into zero; the implementation uses exact floating-point zero.

## Language notes

Python joins a list of digit strings.
Java accumulates characters in `StringBuilder`.
Both operate on binary floating-point inputs, whose stored values determine the repeated-doubling sequence.
