## Intuition

Between two chosen stops, at most two real stops may be skipped.
Thus the next chosen stop can follow one of the previous three positions.
Dynamic programming keeps the cheapest route ending at each stop and combines only those permitted predecessors.

## Brute force

Try every subset of rest stops, reject routes with three consecutive skipped stops, and minimize total detour time.
This requires exponentially many subsets and repeatedly examines equivalent prefixes.

## Approach

If fewer than three stops exist, skip them all and return zero.
Otherwise store the cost of choosing real stop `stop` in `best[stop + 1]`.
The first three real stops can each be reached directly from the starting point.
For every later stop, add its detour time to the minimum accumulated cost among the previous three real stops.
Finally take the minimum over the last three stored stop costs, because the destination may follow any of them without skipping more than two stops.
The answer is not necessarily the cost of stopping at the final rest stop.

## Walkthrough

Example 1 produces accumulated stop costs `[8, 1, 2, 4, 10, 8, 6, 10]`.
The stop at index 3 costs 3 and can follow index 1's accumulated cost 1, giving 4.
Index 6 adds its cost 2 to that route, giving 6.
Choosing indices 1, 3, and 6 leaves skipped runs of lengths one, one, two, and one around the chosen stops.
The final three accumulated costs are 8, 6, and 10, so the answer is 6.

## Complexity

Each of n stops checks at most three predecessors.
Both references take O(n) time and O(n) space for the dynamic-programming array.
Although rolling storage could reduce space, the displayed references retain all stop costs.

## Edge cases

Empty input and routes with one or two stops cost zero.
With exactly three stops, at least one must be chosen, so the cheapest individual detour wins.

## Common mistakes

Three positions between selected indices means two skipped stops.
Do not force the final stop into the route.

## Language notes

Python constructs a small predecessor list and final slice.
Java compares the three entries directly; both use the same shifted table indexing.
