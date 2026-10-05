## Intuition

Consecutive seven day windows overlap in six days.
Moving the window one step only removes its oldest day and adds the next day, so a running sum avoids adding the same six values again.

## Brute force

Summing each complete week independently performs seven additions per start position.
Because seven is fixed, that is already O(n), but the rolling sum reduces repeated arithmetic and directly illustrates fixed length sliding windows.

## Approach

Return zero immediately when fewer than seven days exist.
Initialize `window` and `best` from the first seven sales values.
For every later `day`, add `sales[day] - sales[day - 7]` to the window and update the maximum.

## Walkthrough

Example 1 begins with total 37 for days 0 through 6.
Sliding produces totals 38, 35, 43, 43, 44, and 40.
The maximum 44 occurs for days 5 through 11, whose values are `[5, 0, 1, 0, 15, 12, 11]`.

## Complexity

The initial sum takes constant work for seven entries, then each later day takes O(1).
Total time is O(n) and auxiliary space is O(1).
Python's initial seven element slice has bounded size independent of n.

## Edge cases

Exactly seven days produces only the initialized sum.
Zero sales are ordinary contributions and may appear anywhere.
An empty array, or any input shorter than a week, returns zero rather than summing an incomplete period.

## Common mistakes

Remove `sales[day - 7]`, not yesterday's value.
Initialize the answer using the first full window so it cannot be skipped.
The task asks for consecutive days, so sorting or selecting the seven largest daily values would solve a different problem.

## Language notes

Python initializes both counters with `sum(sales[:7])`.
Java computes that first sum explicitly in a loop.
Under the sales bound, a seven day sum is less than 7,000, so Java's integer counters are sufficient.
