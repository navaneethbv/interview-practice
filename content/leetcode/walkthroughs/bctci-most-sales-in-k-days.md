## Intuition

Consecutive k-day windows overlap in all but two positions.
Moving the window one day forward removes its oldest day's sales and adds its new last day's sales.
A running sum captures this change without recomputing the shared middle days.

## Brute force

For every possible start, sum all k days from scratch.
This costs O(n times k) time when n days are available.

## Approach

Sum the first k sales values and initialize both `window` and `best` from that sum.
Set `best_start` to zero, since the first window is initially the winner.
For each subsequent `day`, add `sales[day]` and subtract `sales[day - k]`.
If this new sum is strictly greater than `best`, store it and the start index `day - k + 1`.
Otherwise preserve the old start, which is earlier because windows are considered chronologically.
After the scan, return the winning starting day rather than its total sales.

## Walkthrough

Example 1 uses `[8, 1, 3, 7]` and k equal to two.
The initial window sums to 9 and starts at day zero.
Advancing to day two removes 8 and adds 3, giving 4, so the winner stays unchanged.
Advancing to day three removes 1 and adds 7, giving 10.
This beats 9, and the corresponding start is `3 - 2 + 1 = 2`.
The answer is 2.

## Complexity

Both references take O(n) time.
Java uses O(1) auxiliary space.
Python's initial `sales[:k]` slice temporarily uses O(k) extra space; the subsequent sliding scan uses only scalar state.

## Edge cases

For k equal to n, only the initialized window exists.
For k equal to one, the answer is the first day with maximum sales.

## Common mistakes

Using greater-than-or-equal replaces the earliest winner on ties.
The incoming day's index is the window end, not its start.

## Language notes

Python initializes the sum with `sum`; Java uses an explicit loop.
The provided limits keep every k-day total within Java's signed integer range.
