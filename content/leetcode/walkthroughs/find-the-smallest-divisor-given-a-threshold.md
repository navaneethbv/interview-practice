## Intuition

Increasing a divisor never increases any rounded quotient, so the feasibility condition is monotonic.
That makes the smallest valid divisor a binary-search boundary between infeasible and feasible values.

## Brute force

Testing every divisor from 1 through the largest number and summing all quotients costs O(nM), where M is the largest value.
That is unnecessary because once a divisor works, every larger divisor also works.

## Approach

1. Search divisors in `[1, max(nums)]`.
2. For the midpoint, compute each ceiling quotient with `(value + middle - 1) // middle`.
3. Move the right boundary left when the sum meets `threshold`; otherwise move the left boundary right.
4. Return the converged boundary.

## Walkthrough

For Example 1, `nums = [1,2,5,9]` and `threshold = 6`, divisor 5 gives quotients 1,1,1,2, totaling 5, so it is feasible.
The search tests smaller candidates, and divisor 4 gives 1,1,2,3, totaling 7, so it is infeasible.
The feasible boundary therefore lies above 4 and at or below 5.
Continuing the binary search confirms 5 as the smallest divisor, matching Example 1.

## Complexity

Each binary-search step scans n values, and there are O(log M) steps, for O(n log M) time.
The computation uses O(1) auxiliary space beyond the input and the scalar sum.

## Edge cases

Divisor 1 is tested and can be the answer when the threshold already allows the original sum.
The largest input value is always feasible because every quotient is one.
Ceiling division must be used, rather than truncating integer division.

## Common mistakes

Move to the left half when the sum is feasible, because the task asks for the smallest valid divisor.
Use the maximum array value as the upper bound, not an arbitrary larger number.
Avoid summing floating-point quotients when integer ceiling division is exact.

## Language notes

Python integers do not overflow, while Java accumulates `roundedSum` in a `long`.
Both references retain the required method name and return the converged integer divisor.
