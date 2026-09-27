## Intuition

Each tap becomes an interval, and the task is the minimum number of intervals covering `[0, n]`.
The greedy interval-cover scan always extends the current covered prefix to the farthest endpoint available before that prefix ends.

## Brute force

Trying every subset of taps is exponential and repeatedly checks the same coverage gaps.
Recording the best reach for each left endpoint enables one linear greedy pass.

## Approach

1. For every tap, clamp its interval to the garden and update `farthest_from[left]`.
2. Scan positions from 0 through `n - 1`, maintaining `next_end`, the farthest interval reachable so far.
3. When the scan reaches `covered_end`, choose another tap and set `covered_end = next_end`.
4. If `next_end` cannot pass the current position, return `-1`; otherwise return the tap count.

## Walkthrough

For Example 1, `n = 5` and ranges are `[3, 4, 1, 1, 0, 0]`.
Tap 1 reaches from 0 through 5 after clamping, so `farthest_from[0] = 5`.
At position 0, the greedy scan opens that tap and sets `covered_end` to 5.
Every point through the garden is covered, so the answer is `1`.

## Complexity

Building `farthest_from` and scanning the garden each take `O(n)` time.
The reach array uses `O(n)` extra space.

## Edge cases

If no interval starts at or before the current uncovered point with a farther endpoint, the garden has a gap and returns `-1`.
Ranges extending outside the garden are clamped to endpoints 0 and `n`.

## Common mistakes

- Choosing the first interval instead of the farthest one can use extra taps or get stuck.
- Treating a tap ending exactly at the current point as progress creates a false cover.
- Forgetting taps centered near an endpoint can cover beyond the garden but must be clamped for indexing.

## Language notes

Python and Java both use integer reach arrays and the same greedy invariant.
The Java version names `coveredEnd` and `nextEnd` separately to make the interval-frontier update explicit.
