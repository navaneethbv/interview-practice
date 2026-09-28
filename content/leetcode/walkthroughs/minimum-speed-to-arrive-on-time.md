## Intuition
Increasing the speed can never make the trip slower, so feasibility is monotonic.
For a candidate speed, every nonfinal train leg is rounded up to a whole hour because departure waits for the next integer hour.
This makes binary search the natural way to find the smallest feasible integer speed.

## Brute force
Trying every speed from 1 upward and simulating all distances costs O(SN), where S is the speed limit and N is the number of legs.
That is too slow when the limit is ten million and there are many distances.
Binary search reduces the number of simulations to logarithmic in the limit.

## Approach
1. Return 1 if the budget covers the sum of distances, which is the travel time at speed one.
2. Convert the two-decimal deadline to integer hundredths and reject budgets no greater than the minimum nonfinal-leg waiting time.
3. Binary search speeds from 1 through 10,000,000, summing integer ceiling division for every nonfinal leg.
4. Subtract those whole hours from the deadline to obtain `remaining` hundredths.
5. Require positive remaining time and test whether the candidate speed is at least `ceil(100 * finalDistance / remaining)`.

## Walkthrough
Example 1 is `dist = [1, 3, 2]` and `hour = 2.5`.
At speed 2, the first leg takes 1 hour and the second nonfinal leg takes `ceil(3 / 2) = 2` hours, already exceeding the budget.
At speed 4, the nonfinal legs cost `ceil(1 / 4) + ceil(3 / 4) = 1 + 1` hours.
The final leg costs `2 / 4 = 0.5` hour, giving exactly 2.5 hours.
The search tests larger and smaller candidates around this boundary and keeps 4 as the first feasible speed.

## Complexity
Each feasibility check scans the input by index and creates no distance slice, so it uses O(1) auxiliary space.
Binary search performs O(log S) checks, so total time is O(N log S).
Both references use O(1) extra space besides the input.

## Edge cases
A single distance has no rounded waiting legs.
An hour budget equal to the number of nonfinal legs is impossible because the final leg needs positive time.
The final leg remains fractional even when earlier legs were rounded.
For distances `[1,14]` and budget 1.14, speed 100 must be accepted exactly; adding binary floating-point values could incorrectly reject it.

## Common mistakes
Rounding the final leg up incorrectly rejects valid speeds.
Rounding every leg to a floating value ignores the required integer-hour waits.
Returning the first feasible speed found by an arbitrary search does not prove minimality.

## Language notes
Both languages round the two-decimal input to integer hundredths once, then perform exact integer feasibility checks.
Java uses `long` for time totals and ceiling division rather than a potentially overflowing speed-times-budget product.
The speed-one early return bounds the converted deadline by the maximum possible sum of distances, keeping it within `long`.
The binary search bounds are inclusive and fit safely in Java's `int` range.
