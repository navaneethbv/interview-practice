## Intuition
Increasing the speed can never make the trip slower, so feasibility is monotonic.
For a candidate speed, every nonfinal train leg is rounded up to a whole hour because departure waits for the next integer hour.
This makes binary search the natural way to find the smallest feasible integer speed.

## Brute force
Trying every speed from 1 upward and simulating all distances costs O(SN), where S is the speed limit and N is the number of legs.
That is too slow when the limit is ten million and there are many distances.
Binary search reduces the number of simulations to logarithmic in the limit.

## Approach
1. Return `-1` when the hour budget is no greater than the number of nonfinal legs, since each such leg costs at least one full hour.
2. Binary search speeds from 1 through 10,000,000.
3. In the feasibility check, add `ceil(distance / speed)` for every nonfinal leg.
4. Add the final leg as an exact fractional travel time and compare the total with `hour`.

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

## Common mistakes
Rounding the final leg up incorrectly rejects valid speeds.
Rounding every leg to a floating value ignores the required integer-hour waits.
Returning the first feasible speed found by an arbitrary search does not prove minimality.

## Language notes
Python uses integer ceiling division for the waiting legs and floating point only for the final fraction.
Java uses `Math.ceil` for the same rounded legs and a `double` for the total time.
The binary search bounds are inclusive and fit safely in Java's `int` range.
