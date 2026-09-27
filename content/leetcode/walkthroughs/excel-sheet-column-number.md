## Intuition
Excel labels use a one-based alphabet, so each letter contributes a value from 1 through 26.
Reading left to right is like evaluating a base-26 number, except there is no zero digit.
Before adding the next letter, multiply the accumulated prefix by 26.

## Brute force
A positional formula could compute each letter's power of 26 separately.
That is still linear but requires handling powers and positions explicitly.
The rolling base conversion uses one accumulator and is less error-prone.

## Approach
1. Start `result` at zero.
2. For each uppercase letter, convert it to `letter - 'A' + 1`.
3. Set `result = result * 26 + value`.
4. Return the final accumulator.

## Walkthrough
Example 1 is `"AZ"`.
After `A`, the result is 1.
Reading `Z` multiplies that prefix by 26 and adds 26, giving `1 * 26 + 26 = 52`.
Example 2, `"BA"`, becomes `2 * 26 + 1 = 53`.

## Complexity
The label is scanned once, so time is O(L).
The accumulator uses O(1) additional space.
The statement guarantees that the final value fits a signed 32-bit integer.

## Edge cases
The one-letter labels `A` and `Z` map to 1 and 26.
Repeated `Z` values carry into the next position naturally.
The conversion is case-sensitive under the uppercase input constraint.

## Common mistakes
Mapping A to zero turns `A` into an invalid column number.
Adding letter values without multiplying the prefix produces wrong multi-letter labels.
Using powers from the right can introduce an unnecessary off-by-one error.

## Language notes
Python uses `ord` to compute each one-based letter value.
Java subtracts the character literal `'A'` and keeps the result in an `int`.
No string slicing or mutable buffer is needed in either reference.
