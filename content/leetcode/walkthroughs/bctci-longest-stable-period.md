## Intuition

A window is stable exactly when its maximum minus minimum stays within the tolerance.
Adding a temperature cannot decrease that range, so an invalid window can be repaired by advancing its left boundary.

## Brute force

Recomputing extrema for every possible interval takes at least quadratic time.
The reference uses two monotone deques to retrieve the current minimum and maximum without rescanning the window.

## Approach

Maintain increasing candidates in `low` and decreasing candidates in `high`, storing indices.
Discard dominated tails before appending `right`.
While the front value difference exceeds `t`, remove any front at `left` and advance `left`.
Then maximize `best` with the valid length.

## Walkthrough

For `[3, 1, 6, 2]` and tolerance 3, `[3, 1]` has range 2 and length 2.
Adding 6 creates range 5, requiring removal of both 3 and 1.
Adding 2 beside 6 has range 4, again forcing a removal.
The best remains 2.

## Complexity

Each index enters and leaves each deque at most once, and `left` advances at most n times.
Total time is O(n), with O(n) worst case auxiliary space for candidate indices.
No sorting or temperature mutation occurs.

## Edge cases

Tolerance zero permits only windows whose values are all equal.
A tolerance at least the full array range admits every element.
Single element windows are always stable because their range is zero, ensuring shrinking has a valid stopping point.

## Common mistakes

A stable period is contiguous, so do not sort the temperatures.
Test the range after updating both deques.
Retain indices for expiration; storing only values cannot distinguish an old occurrence from a newer equal temperature.

## Language notes

Python uses `deque` and Java uses `ArrayDeque<Integer>`.
Both discard older equal candidates because the new equal value expires later.
The nonnegative tolerance guarantee means the shrinking loop never needs to remove the last remaining window element.
