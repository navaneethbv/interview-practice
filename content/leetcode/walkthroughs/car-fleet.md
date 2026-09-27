## Intuition

A car's unobstructed arrival time is its remaining distance divided by its speed.
Process cars from nearest to farthest from the target, so the fleet directly ahead has already been considered.
A following car joins that fleet whenever its own arrival time is no later than the fleet's arrival time.

## Brute force

Simulating movement in small time increments can miss the exact moment cars meet and has no useful bound independent of the time-step size.
Repeatedly searching pairs for the next collision can instead require quadratic work.
Arrival times summarize the interaction without simulating positions over time.

## Approach

1. Sort `(position, speed)` pairs by decreasing position.
2. Initialize `fleets = 0` and `slowest = -1`, below every possible arrival time.
3. For each car, compute `arrival` assuming an unobstructed journey.
4. If `arrival > slowest`, this car cannot catch the fleet ahead, so increment `fleets` and replace `slowest`.
5. Otherwise, leave both variables unchanged because the car joins the existing fleet.

After each iteration, `slowest` is the arrival time of the rearmost fleet among processed cars.
A joining car cannot make that fleet arrive sooner because passing is forbidden.
Equality joins a fleet too: meeting at the destination counts.

## Walkthrough

Example 1 has target 10, positions `[0, 4, 8]`, and speeds `[2, 2, 1]`.

| Position | Speed | `arrival` | `slowest` afterward | `fleets` |
| --- | --- | --- | --- | --- |
| 8 | 1 | 2 | 2 | 1 |
| 4 | 2 | 3 | 3 | 2 |
| 0 | 2 | 5 | 5 | 3 |

Every following car arrives later than the fleet ahead and therefore cannot catch it.
The result is 3.

## Complexity

- Time: O(n log n), dominated by sorting n cars; the scan is O(n).
- Space: O(n), for the paired car collection and sorting workspace.

## Edge cases

One car always forms one fleet.
Equal arrival times merge, even when positions and speeds differ.
Positions are distinct and every speed is positive, so no division by zero or ordering tie needs handling.

## Common mistakes

- Sorting speeds separately destroys their correspondence with positions.
- Scanning from the rear does not establish the fleet ahead first.
- Using `>=` creates an extra fleet for a meeting exactly at the target.

## Language notes

Python `/` produces a floating-point arrival time.
Java casts the distance to `double` before division so the quotient is not truncated.
The Java comparator uses `Integer.compare` to express descending position order directly.
