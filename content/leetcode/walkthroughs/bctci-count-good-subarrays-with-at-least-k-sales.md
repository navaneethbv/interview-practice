## Intuition

Bad days divide the array into independent runs of good days.
Inside a good run, every value is positive, so removing the leftmost day strictly decreases the sales sum.
For each ending position, identify the latest start that still reaches `k`.

## Brute force

Enumerate every subarray, checking that every day is good and summing its sales.
Even with incremental sums, this takes O(n²) time.

## Approach

Track the good run's first index `run_start`, a movable `left`, the current sum `window`, and the accumulated answer `total`.
A value below 10 resets both starting indices to `right + 1` and clears `window`.
For a good day, add its sales and remove leftmost days while the remaining sum would still be at least `k`.
If the resulting window reaches `k`, every start from `run_start` through `left` also qualifies, contributing `left - run_start + 1`.
Later starts fail by the stopping condition, so this counts precisely the valid subarrays ending here.

## Walkthrough

Example 1 has `[15, 20, 5, 30, 25]` and `k = 50`.
The first good run reaches only 35, contributing nothing.
The value 5 resets the run at index 3.
The next sum is 30, then 55 after adding 25.
Removing 30 would leave 25, so `left` stays 3.
Exactly one start qualifies for the final endpoint, giving answer 1.

## Complexity

Each index enters and leaves the window at most once.
Time is O(n), and auxiliary space is O(1).

## Edge cases

An empty array or a run whose total is too small contributes zero.
A single good day can itself meet the threshold.

## Common mistakes

Do not let a window cross a bad day.
Count all earlier starts in the current good run rather than only the shortest qualifying window.

## Language notes

Python's integer result is unbounded.
Java uses `long` for both the running sum and count, since the number of subarrays can exceed `int`.
