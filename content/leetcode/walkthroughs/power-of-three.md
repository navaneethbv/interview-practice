## Intuition
Positive powers of three can be reduced to one by repeatedly dividing by three.
Any remainder means the original value was not an exact power.
Nonpositive values are rejected before division.

## Brute force
Testing membership against a precomputed list of powers works but requires choosing a maximum range and storing those values.
Repeated division uses constant space and stops after logarithmically many steps.

## Approach
1. Return false for n less than or equal to zero.
2. While n is divisible by 3, divide it by 3.
3. Return whether the remaining value is exactly 1.

## Walkthrough
Example 1 has n equal to 81.
The divisions produce 27, 9, 3, and 1 with no remainders.
Because the final value is 1, 81 is a power of three and the method returns true.
For 45, division by 3 gives 15 and then 5, which is not divisible by 3, so the remaining value is not 1.

## Complexity
The loop performs O(log base 3 of n) divisions.
It uses O(1) additional space.

## Edge cases
The value 1 qualifies as three to the zero power.
Zero and negative values do not qualify.
The largest signed 32-bit input is handled without multiplication overflow.

## Common mistakes
Returning true for zero confuses divisibility with being a power.
Multiplying powers upward can overflow before reaching the target.
Forgetting to check the final remainder accepts values such as 45.

## Language notes
Python uses `//` for exact integer division.
Java uses `/` on positive integers, with the same quotient behavior.
Both implementations avoid logarithms, whose floating-point rounding could misclassify a value.
