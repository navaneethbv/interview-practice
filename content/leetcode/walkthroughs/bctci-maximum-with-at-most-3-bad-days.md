## Intuition

Treat a bad day as cost one and a good day as cost zero.
The desired run is the longest contiguous window whose total cost does not exceed three.
Nonnegative costs mean that moving the left boundary forward can always repair an oversized window.

## Brute force

Enumerate every pair of endpoints and count bad days inside each interval.
Even with incremental counting for each starting point, this takes O(n²) time.

## Approach

Maintain `left`, the current bad-day count `cost`, and `best`.
When advancing `right`, add one if its sales value is below 10.
While `cost > 3`, subtract the badness of `sales[left]` and advance `left`.
After repair, record the window length `right - left + 1`.
Every earlier left boundary is invalid for this endpoint, while every later one is shorter, so the maintained window is the best candidate ending at `right`.
Taking the maximum across endpoints gives the global answer.

## Walkthrough

Example 1 first reaches indices 0 through 3 with three bad days and length four.
Adding index 4 introduces a fourth bad day, so removing index 0 restores validity.
The window from index 1 through index 6 then has length six and three bad days.
Adding index 7 forces left past indices 1 and 2.
The final window from index 3 through index 8 again has length six.
The maximum is therefore 6.

## Complexity

Each index is added once and removed at most once.
The nested loops therefore take O(n) total time and O(1) auxiliary space.

## Edge cases

Empty input returns zero.
Any input with at most three bad days qualifies in full, including an array consisting of exactly three bad days.

## Common mistakes

The requirement is at most three, not exactly three.
Do not reset the whole window at every bad day or charge the number of missing sales instead of one.

## Language notes

Python and Java use explicit zero-or-one contributions.
Java stores `cost` as long, although the number of days itself already fits in int.
