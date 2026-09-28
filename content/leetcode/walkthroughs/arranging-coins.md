## Intuition

Completing r rows needs the triangular total `r(r+1)/2` coins.
That total increases monotonically with r, so binary search finds the largest row count whose requirement fits in n coins.

## Brute force

Subtracting row sizes one at a time takes O(sqrt(n)) iterations.
That is acceptable for many inputs but binary search is logarithmic and handles the full signed integer bound comfortably.

## Approach

1. Search row counts from 0 through n.
2. Compute the triangular requirement for the midpoint.
3. Move right when the requirement fits, otherwise move left.
4. Return the final `right`, the largest feasible row count.

## Walkthrough

For Example 1, `n = 8`, rows 1 through 3 need `1 + 2 + 3 = 6` coins, while row 4 would need 10.
Binary search tests candidate row counts and keeps the feasible side whenever the triangular total is at most 8.
It converges on 3, leaving two coins toward the incomplete fourth row.
For `n = 10`, the same condition accepts 4 exactly, so the result is 4.

## Complexity

The search interval halves each iteration, giving O(log n) time and O(1) auxiliary space.
Java uses `long` for the triangular multiplication because `middle * (middle + 1)` can exceed `int` before division.

## Edge cases

One coin completes one row.
An exact triangular number returns its exact row count.
The maximum stated input returns 65535 without integer overflow in the Java calculation.

## Common mistakes

Return the last feasible count, not the first infeasible midpoint.
Use a wide type for the product in Java.
Do not treat leftover coins as a complete row.

## Language notes

Python's arbitrary-precision integers make the triangular expression direct.
Java stores both search bounds and the product in `long`, then casts the final feasible row count back to `int`.
