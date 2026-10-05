## Intuition

Each fixed length window needs both its minimum and maximum.
Two monotone deques retain only indices that can still become one of those extrema before leaving the window.

## Brute force

Scanning all k temperatures in every window takes O(nk) time.
Repeated values and overlapping windows make much of that work redundant, so the reference updates candidate extrema incrementally.

## Approach

Maintain increasing values in `low` and decreasing values in `high`.
Before appending `right`, discard dominated tail indices from both deques.
Advance `left` when the window exceeds k, removing expired front indices.
For a full window, maximize the difference between the two front values.

## Walkthrough

Example 1 uses k equal to 2.
Window `[3, 1]` has range 2.
Window `[1, 6]` has range 5, updating `best`.
Window `[6, 2]` has range 4, so the largest difference remains 5.

## Complexity

Every index enters each deque once and leaves it at most once, giving O(n) time.
Each deque contains only candidates in the current window, using O(k) auxiliary space.
Only the scalar largest difference is returned.

## Edge cases

If k equals the array length, the algorithm evaluates exactly one complete window.
Equal temperatures can discard older equal candidates because newer copies remain valid longer.
Negative temperatures work with the same comparisons and subtraction.

## Common mistakes

Store indices so expired elements can be identified by position.
Do not update `best` before k elements have arrived.
Removing a dominated tail is different from expiring a front; both operations are needed to preserve the deque invariants.

## Language notes

Python uses `collections.deque` with `popleft` for expiration.
Java uses `ArrayDeque<Integer>` with first and last operations.
The input temperature bounds keep every difference between zero and 200, safely inside an integer result.
