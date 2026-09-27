## Intuition

Both clock hands move continuously around a circle.
The minute hand travels six degrees per minute, while the hour hand travels thirty degrees per hour plus half a degree for each elapsed minute.
Their angular difference gives one arc, and subtracting it from 360 gives the other.

## Approach

1. Normalize twelve o'clock to zero hours using `hour % 12`.
2. Compute the hour position as thirty times that value plus `minutes * 0.5`.
3. Compute the minute position as `minutes * 6`.
4. Take the absolute difference between those positions.
5. Return the smaller of difference and `360 - difference`.

The calculation measures both hands clockwise from the twelve-o'clock position.
Using the same reference direction makes ordinary subtraction meaningful.
There is no need to simulate each minute or search around the dial.
The final minimum restricts the result to the range from zero through 180 degrees.

## Walkthrough

Example 1 uses hour three and thirty minutes.

| Quantity | Calculation | Degrees |
| --- | --- | ---: |
| hour-hand position | 3 * 30 + 30 * 0.5 | 105 |
| minute-hand position | 30 * 6 | 180 |
| direct difference | abs(105 - 180) | 75 |
| other arc | 360 - 75 | 285 |

The smaller arc is seventy-five degrees, so the returned value is 75.0.
Leaving the hour hand exactly at the three marker would incorrectly give ninety degrees.

## Complexity

Time is O(1), since the same fixed number of arithmetic operations is performed for every input.
Auxiliary space is O(1), holding the two hand positions and their difference.
No arrays, loops, or recursion are required.

## Edge cases

At twelve exactly, both normalized positions are zero.
Opposite hands produce 180 degrees, with equal arcs in both directions.
A direct difference above 180 requires choosing the complementary arc.
Odd minute values can place the hour hand at a half-degree position.

## Common mistakes

- Ignoring elapsed minutes in the hour-hand position produces an inaccurate angle.
- Returning the absolute difference alone can select the larger arc.
- Performing integer division for the half-degree term discards fractional movement.

## Language notes

Python evaluates the half-degree term as a float; Java uses double.
The multiplier 0.5 represents halves exactly in binary, and all intermediate values here are small.
Both implementations therefore preserve the required half-degree precision without special rounding.
