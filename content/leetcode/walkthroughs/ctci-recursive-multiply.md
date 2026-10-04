## Intuition

Multiplication can be reconstructed from doubling and addition.
Halving one operand shrinks the remaining problem quickly: twice the product of its lower half accounts for an even operand, with one extra copy of the other operand needed when it is odd.

## Brute force

Add b to an accumulator a times.
Choosing the smaller operand as the repetition count improves this to O(min(a, b)) additions, but recursive halving requires only logarithmically many levels.

## Approach

Set `smaller` to the smaller input and `bigger` to the other.
The helper returns zero for a zero multiplier and `bigger` for a multiplier of one.
Otherwise compute `half` recursively using `smaller >> 1`.
Double that result by adding it to itself.
If `smaller` is odd, add `bigger` once more; otherwise return the doubled result directly.
Only one recursive call is made at each level, so the half-product is never computed twice.

## Walkthrough

Example 1 multiplies 7 by 8.
The recursive smaller operands are 7, 3, and 1.
The base case returns 8.
At smaller equal to 3, double 8 to 16 and add 8 to obtain 24.
At smaller equal to 7, double 24 to 48 and add 8 again to obtain 56.
This matches `7 * 8` without using multiplication in the recursive calculation.

## Complexity

For s equal to the smaller operand, time is O(log s).
The recursive call stack uses O(log s) space.
Each level performs a constant number of arithmetic operations.

## Edge cases

An operand of one reaches the base case immediately.
Powers of two use only doubling on the way back up.
The helper's zero case is defensive even though public inputs are positive.

## Common mistakes

Calling the helper twice for the half-product changes logarithmic work into a branching recursion.
Ignoring the odd remainder undercounts every odd multiplier larger than one.

## Language notes

Python and Java use a right shift to halve the positive smaller operand.
The contract bounds the product within a signed 32-bit integer, keeping Java's intermediate nonnegative partial products representable.
