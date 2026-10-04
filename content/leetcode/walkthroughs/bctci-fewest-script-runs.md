## Intuition

The meeting that ends earliest forces a script run no later than its end.
Placing that run exactly at the endpoint captures it while reaching as far right as possible to cover other meetings too.

## Brute force

Trying combinations of possible run times is exponential.
Selecting by earliest meeting start can waste a run before several overlapping meetings become simultaneously active.

## Approach

Sort meetings by end time.
Track `last_run`, initially -1 because valid meeting starts are nonnegative.
If a meeting starts after last_run, it is not yet covered, so increment runs and set last_run to that meeting's end.
Otherwise the existing run lies inside it: sorted end order guarantees it is not after this meeting ends.
Any optimal solution can move its first required run to the earliest ending meeting's endpoint without losing coverage of meetings it covered later.
Repeating this exchange argument proves the greedy choice.

## Walkthrough

```text
Input: meetings = [[2, 3], [1, 4], [2, 3], [3, 6], [8, 10]]
Output: 2
```

Example 1 first chooses time 3 for an interval `[2, 3]`.
The duplicate `[2, 3]`, `[1, 4]`, and `[3, 6]` all include that same time.
The final meeting `[8, 10]` begins after 3, so choose a second run at 10.
Two runs cover everything, and disjoint early and late meetings prove one run cannot suffice.

## Complexity

Sorting takes O(n log n) time and the scan O(n).
Both references create a sorted outer copy, requiring O(n) extra space.

## Edge cases

An empty meeting list needs zero runs.
Meetings touching at an endpoint can share one run because endpoints are inclusive.
Duplicate intervals add no new requirement.

## Common mistakes

Use `start > last_run`, not greater-than-or-equal.
Sort by end rather than by start or duration.

## Language notes

Python uses `sorted` with an end-time key.
Java shallow-clones the outer array before sorting, preserving the original meeting order without modifying individual endpoint pairs.
