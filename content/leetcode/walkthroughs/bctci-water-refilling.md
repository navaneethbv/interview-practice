## Intuition

If `x` full small containers are poured into the large container, the total water is `x * b` gallons.
The feasible counts form a contiguous range because increasing `x` only increases that total.
Binary search can therefore find the largest feasible count without using division.

## Approach

Search counts from one through `a`, using an upper midpoint so the lower bound can safely move upward.
If `mid * b <= a`, `mid` is feasible and becomes the new lower bound.
Otherwise the count is too large, so reduce the upper bound to `mid - 1`.
When the bounds meet, `low` is the greatest count whose total volume fits.

## Walkthrough

For Example 1, `a = 18` and `b = 5`.
The search tests candidate counts such as ten, five, and three, retaining three because fifteen gallons fit while four would require twenty gallons.
The bounds converge at three, so the method returns three.
For `a = 10` and `b = 2`, five is feasible exactly and six is not, producing five.

## Complexity

The interval at least halves on each iteration, so the running time is `O(log a)`.
The method uses `O(1)` auxiliary space.
Java widens `mid * b` to `long` before comparison so the product cannot overflow a 32-bit integer during the search.

## Edge cases

When `b` is just below `a`, exactly one pour fits.
When `b` is one, the answer is `a`.
An exact multiple returns that quotient count, while a remainder leaves the floor count as the answer without performing division.

## Common mistakes

Using a lower midpoint can leave the search stuck when only the upper candidate remains.
Returning the first feasible count finds a minimum, while the task asks for the maximum feasible count.
Checking `mid + b <= a` models adding gallons rather than counting full pours and gives the wrong predicate.

## Language notes

Python uses the allowed right shift to compute the midpoint and ordinary integer multiplication for the feasibility test.
Java stores both bounds and the midpoint as `long`, then casts the final count back to `int`.
Neither reference uses division, and both retain the parameter names `a` and `b`.
