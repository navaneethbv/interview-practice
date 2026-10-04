## Intuition

Only the good-or-bad classification matters, not the numeric difference between sales values.
A valid run extends when the current classification differs from the previous day's and otherwise restarts at the current day.

## Brute force

Checking every possible interval for alternating classifications repeats adjacent comparisons and can take quadratic time or worse.
A current-run summary tests each neighboring pair once.

## Approach

Initialize best and run to zero.
For each day, compare whether its sales are at least 10 with the same predicate for the previous day.
If the classifications differ, increment run.
Otherwise set run to one, since the current day alone is valid.
Update best after either branch.
The invariant is that run is the longest alternating suffix ending today; every optimal interval is considered when its final day is processed.

## Walkthrough

```text
Input: sales = [8, 9, 20, 0, 9]
Output: 3
```

Example 1 classifies as bad, bad, good, bad, bad.
The first two days each leave run at one because their classes match.
Day 2 extends the run to two and day 3 extends it to three.
The final bad day matches its predecessor and resets run to one.
The saved maximum remains 3, corresponding to sales `[9, 20, 0]`.

## Complexity

The scan takes O(n) time and O(1) extra space.
No classification array is materialized and the original sales array stays unchanged.

## Edge cases

Empty input returns zero.
Any singleton has answer one.
An entirely good or entirely bad nonempty array has answer one.
Exactly 10 sales is a good day.

## Common mistakes

Do not alternate based on increasing and decreasing numeric sales.
Do not skip same-class days to construct a noncontiguous subsequence.

## Language notes

Python compares two boolean expressions with `!=`.
Java computes the equivalent `alternates` boolean before updating run, keeping the first-day guard ahead of the previous-index access.
