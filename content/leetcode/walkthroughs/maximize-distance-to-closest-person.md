## Intuition
The best empty seat is either at an edge or halfway through the largest gap between occupied seats.
A scan can evaluate both edge gaps and every internal gap.

## Brute force
A naive method tests every empty seat and scans outward to find its nearest occupied seat.
For n seats this can take O(n^2) time.
The occupied-position scan computes each candidate gap once.

## Approach
1. Record the first occupied position and the previous occupied position while scanning.
2. The leading empty run has distance equal to the first occupied index.
3. Each internal run has best distance equal to half its gap using integer division.
4. The trailing run has distance `n - 1 - lastOccupied`.

## Walkthrough
Example 1 is `[1, 0, 0, 0, 1]`.
The first occupied seat is index 0, so the leading candidate is 0.
The next occupied seat is index 4, leaving a gap of four positions from 0 to 4.
Its middle candidate is `(4 - 0) // 2 = 2`, at index 2.
There is no trailing empty run, so the maximum distance is 2.

## Complexity
The scan takes O(n) time and O(1) auxiliary space.
The Python reference avoids building an occupied-index list, so it does not add an O(n) copy.
Java likewise scans the original array directly.

## Edge cases
An empty prefix can be the best choice when the first person is far from index zero.
A trailing empty suffix can be best when the last person is far from the end.
An internal odd gap uses floor division because the seat is integral.

## Common mistakes
Using the full internal gap instead of half overestimates the distance.
Ignoring the two edge runs misses Example 2.
Choosing a midpoint without comparing all gaps can miss a larger candidate.

## Language notes
Python tracks first and previous occupied indices with `None` and integers.
Java uses `-1` as the unseen sentinel and preserves integer division semantics.
