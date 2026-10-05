## Intuition

A valid trip must choose a stop among every three consecutive positions.
If a chosen stop is at index i, the previous chosen stop can be one, two, or three positions earlier.
Dynamic programming can minimize the cost of ending a chosen-stop sequence at each position.

## Brute force

Enumerate every subset of stops and reject any subset leaving three consecutive positions unvisited.
This takes exponential time even though each choice depends only on a short recent history.

## Approach

Let `best[stop + 1]` be the minimum detour cost for a valid prefix that stops at index stop.
Any of the first three positions can be the first selected stop, so its initial cost is just `times[stop]`.
For later stops, add the current cost to the minimum of the three preceding chosen-stop states.
At the end, take the minimum among the last three states, allowing up to two skipped stops after the final selection.
When there are fewer than three total stops, skipping all of them is valid and costs zero.

## Walkthrough

Example 1 has costs `[8, 1, 2, 3, 9, 6, 2, 4]`.
The chosen-stop costs become `[8, 1, 2, 4, 10, 8, 6, 10]`.
The last three candidates are 8, 6, and 10, so the answer is 6.
One optimal trip stops at indices 1, 3, and 6, costing `1 + 3 + 2`.
Every gap, including the start and finish, skips at most two stops.

## Complexity

Each stop examines at most three previous states, giving O(n) time.
The reference stores the full `best` array and therefore uses O(n) auxiliary space, although the recurrence could be compressed.

## Edge cases

An empty input or two stops needs no detour.
For exactly three stops, the cheapest single stop is sufficient.

## Common mistakes

Do not require a stop at the last position.
The state index is one greater than the physical stop index.

## Language notes

Python constructs a constant-size candidate list per iteration.
Java compares three int states directly; the stated bounds keep the total below int overflow.
