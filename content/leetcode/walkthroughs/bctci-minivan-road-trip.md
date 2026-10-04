## Intuition

A chosen stop can follow any earlier chosen stop separated by at most k skipped stops.
This creates a dynamic program over the most recent stop, with a free virtual stop before the trip and a final choice among stops close enough to the destination.

## Brute force

Enumerate every subset of rest stops and reject those with a gap exceeding k.
There are exponentially many subsets, while only the cheapest total ending at each actual stop matters for future choices.

## Approach

`best[stop + 1]` records the minimum total when actually stopping at index `stop`.
For `stop <= k`, the trip may reach that stop directly with no earlier detour.
Otherwise take the minimum of `best[stop - gap]` for gaps zero through k, then add `times[stop]`.
Those shifted indices encode previous stops with at most k skipped positions.
Finally minimize `best` from index `max(0, n - k)` through n so the remaining suffix is also short enough.

## Walkthrough

Example 1 uses `[8, 1, 2, 3, 9, 6, 2, 4]` with k two.
The full best array becomes `[0, 8, 1, 2, 4, 10, 8, 6, 10]`.
The allowed final entries are 8, 6, and 10, so the answer is 6.
Stops at indices 1, 3, and 6 cost `1 + 3 + 2`, with every skipped run at most two.

## Complexity

Time is O(n times min(n, k + 1)) and storage is O(n + k) at most, hence O(n + k) with Python's temporary candidate list.
Java uses only the O(n) best array.

## Edge cases

When n is at most k, skipping every stop costs zero.
Empty input also returns zero.

## Common mistakes

The allowed index distance between chosen stops is k plus one, not k.
Do not force a stop at the final rest area.

## Language notes

Python explicitly builds each predecessor window.
Java scans its entries with a running minimum; both return a cost, not the stop sequence.
