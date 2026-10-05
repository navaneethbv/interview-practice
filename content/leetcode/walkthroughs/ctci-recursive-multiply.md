## Intuition

If the smaller factor is even, its product can be computed by halving that factor, recursively multiplying, and doubling the result.
If it is odd, the same doubled half needs one additional copy of the larger factor.
Choosing the smaller factor for recursion keeps the depth logarithmic.

## Approach

Set `smaller` and `bigger` so recursion always halves the smaller value.
Return `0` for a zero factor and `bigger` for a factor of one.
Recursively compute the product for `smaller >> 1`, double it with addition, and add `bigger` when the original smaller factor was odd.
This uses only addition, subtraction-free halving, bit shifts, and a parity check.

## Walkthrough

For Example 1, the factors are seven and eight, so recursion uses seven as `smaller`.
It computes the product for three, doubles that result to represent six copies of eight, and adds one more eight because seven is odd.
The result is fifty six.
For `1 * 99`, the base case returns 99 immediately.

## Complexity

Each recursive call halves `smaller`, so the running time is `O(log min(a, b))`.
The recursion stack uses `O(log min(a, b))` space.
The method does not allocate an array or use multiplication or division in the product recurrence.

## Edge cases

The inputs are positive by contract, but the zero base case keeps the helper complete and mirrors the reference.
A factor of one stops recursion without unnecessary additions.
When the factors are equal, either can be selected as the smaller value and the result is unchanged.

## Common mistakes

Recursing on the larger factor can create a deeper call chain than necessary.
Forgetting the odd remainder loses one copy of `bigger` whenever `smaller` is odd.
Using multiplication in the recurrence defeats the operation restriction even if the numeric answer is correct.

## Language notes

Python uses `smaller >> 1` and `smaller & 1` directly.
Java uses the same shifts and parity test with `int` arithmetic, and the contract bounds the product below the integer limit.
Both implementations keep the public method name `multiply` and the two input parameters unchanged.
