## Intuition

The integer square root is the greatest integer whose square does not exceed x.
Squares increase as candidate integers increase, so the answer is a boundary in a sorted numeric range.
Binary search can discard half of the candidates after each comparison.

## Brute force

A linear method could test 0, 1, 2, and so on until the next square is too large.
That takes O(sqrt(x)) time and can be slow for the largest inputs.
Binary search finds the same boundary in logarithmic time.

## Approach

1. Search the inclusive range from zero through x.
2. Compute the middle candidate.
3. If its square is at most x, record it as feasible and move left above it.
4. Otherwise move the right boundary below it.
5. Return right after the interval closes because it is the greatest feasible candidate.

## Walkthrough

Example 1 has x equal to 20.
The search tests middle 10, whose square is too large, and then narrows to 0 through 9.
It tests 4, whose square is 16 and therefore feasible, then searches above 4.
Candidates 7 and 5 are too large, and the final feasible boundary is 4.

## Complexity

The search range contains x plus one candidates, so the time complexity is O(log x) for positive x.
The method uses O(1) auxiliary space.
Java multiplies long candidates to avoid integer overflow before comparing with x.
The returned integer is a scalar and no output collection is allocated.

## Edge cases

Zero returns zero.
A perfect square returns the exact root.
A non-square returns the floor of the mathematical square root.
The initial range includes one so positive inputs have a valid candidate.

## Common mistakes

- Returning left after it advances past the answer returns the first infeasible value.
- Comparing middle with x instead of middle squared tests the wrong property.
- Multiplying Java ints can overflow before the comparison.
- Using floating-point square root can introduce rounding issues at integer boundaries.

## Language notes

Python integers handle the square operation directly.
Java uses long bounds and products, then casts the final feasible value to int.
Both references use the same inclusive interval invariant.
