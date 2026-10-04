## Intuition

Only the good or bad category matters, not the size of a sales change.
The longest alternating run ending today either extends yesterday's run or restarts with today's single element.

## Brute force

Enumerating every contiguous interval and checking all adjacent categories repeats comparisons.
A single forward scan needs only the length of the alternating suffix ending at the previous position and the best length seen.

## Approach

Maintain `run` and `best`.
For each `day`, compare `(value >= 10)` with the previous day's category when a previous day exists.
If they differ, increment `run`; otherwise set it to one.
Update `best` after either choice.

## Walkthrough

Example 1 has categories bad, bad, good, bad, bad for `[8, 9, 20, 0, 9]`.
The run lengths become 1, 1, 2, 3, and 1.
The maximum is 3, corresponding to sales `[9, 20, 0]` at indices 1 through 3.

## Complexity

The algorithm performs one constant time update per day, giving O(n) time.
Only two counters and the loop position are stored, giving O(1) auxiliary space.
No category array or list of candidate intervals is needed.

## Edge cases

An empty input returns zero because `best` never changes.
A single day returns one.
Sales exactly equal to 10 are good.
If all days share a category, every nonempty alternating run has length one.

## Common mistakes

Do not confuse this contiguous run problem with an alternating subsequence, which permits skipped days.
Numerically rising and falling sales are irrelevant if their categories remain the same.
On a repeated category, reset to one rather than zero.

## Language notes

Python compares Boolean category expressions directly.
Java stores the comparison in `alternates` and uses a ternary expression for the new run length.
Both guard the previous day access with `day > 0` and leave sales unchanged.
