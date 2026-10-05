## Intuition

Only the nearest strictly smaller building on the left and nearest strictly greater building on the right matter.
If either nearest witness lies outside distance k, every other witness on that side is farther away and cannot qualify.

## Brute force

For each building, inspect up to k neighbors in each direction.
That takes O(nk) comparisons and becomes quadratic when the visibility limit spans most of the street.

## Approach

Scan left to right with a monotonic stack of indices.
Pop buildings at least as tall as the current one; the remaining top is its nearest strictly smaller left neighbor.
Store whether that neighbor is within k in `answer`.
Clear the stack and scan right to left, popping buildings no taller than the current one.
Combine the existing answer with the distance test for the nearest strictly greater right neighbor.
All comparisons use the original `street` values.

## Walkthrough

Example 1 uses `[2, 5, 3, 8]` and k one.
Building 2 lacks a smaller left neighbor.
Building 5 has visible smaller 2, but its next taller building 8 is two positions away.
Building 3 has visible taller 8, but its smaller left witness 2 is two positions away.
Building 8 has no taller building to its right.
All four answers are false.

## Complexity

Time is O(n), since each index is pushed and popped at most once per pass.
The stack uses O(n) auxiliary space, and the returned boolean array has n entries.

## Edge cases

Equal-height buildings are never strict witnesses.
The first and last buildings cannot satisfy both sides.
A large k removes distance restrictions but not strict height requirements.

## Common mistakes

Do not delete failed buildings before the second pass.
Do not retain equal heights as qualifying witnesses.

## Language notes

Python uses one reusable list stack.
Java uses `ArrayDeque` from its last end, matching Python's append and pop operations on the stack top.
