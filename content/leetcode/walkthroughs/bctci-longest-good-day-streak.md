## Intuition

A bad day ends every all-good streak that was still active.
The only useful state for extending a streak is the number of consecutive good days ending immediately before the current day.
Keep that current run separately from the best run seen anywhere.

## Brute force

For every possible starting day, scan forward until reaching a bad day and measure the run.
An array containing only good days makes this repeat many scans and take O(n²) time.

## Approach

Initialize `run = 0` and `best = 0`.
For each sales value, increment `run` when the value is at least 10; otherwise reset it to zero.
Update `best` with the maximum of its previous value and the new run length.
The run invariant follows directly from whether the current day can extend yesterday's all-good suffix.
The best invariant then follows because every possible consecutive streak ends at some position, and its maximal suffix length is considered at that position.

## Walkthrough

Example 1 has sales `[0, 14, 7, 12, 10, 20]`.
The first day resets the run to zero.
The value 14 starts a run of one and raises best to one.
The value 7 breaks that streak.
Values 12, 10, and 20 then produce run lengths one, two, and three.
The final maximum is 3, representing the last three consecutive days.

## Complexity

A single pass takes O(n) time and uses O(1) auxiliary space.
The method does not store streak boundaries because the requested output is only a length.

## Edge cases

An empty array returns zero because neither counter changes.
All bad days also return zero; all good days return the full length.

## Common mistakes

Exactly 10 sales qualifies as good.
Do not return the final run alone, since an earlier streak may have been longer.
Counting all good days ignores the consecutive requirement.

## Language notes

Python uses a conditional expression and `max`.
Java uses the equivalent ternary expression and `Math.max`; its int counters safely hold the maximum allowed length.
