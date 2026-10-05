## Intuition

For a fixed right endpoint, every suffix of a valid window also has at most `k` bad days.
Once the earliest valid left endpoint is known, the number of valid subarrays ending there is simply the window length.

## Brute force

Enumerating all start and end pairs requires quadratic time even if bad day counts are available through prefixes.
A sliding window exploits the fact that adding days cannot reduce the number of bad days.

## Approach

The helper `_at_most` tracks `left`, `bad`, and `total`.
For each `right`, add whether the new sales value is below 10.
Advance `left` while `bad > k`, removing each departing day's contribution.
Add `right - left + 1` to the total.

## Walkthrough

For `[0, 20, 5]` with `k = 1`, endpoint 0 contributes one interval.
Endpoint 1 contributes two, `[0, 20]` and `[20]`.
Endpoint 2 first removes day 0, then contributes `[20, 5]` and `[5]`.
The contributions 1, 2, and 2 sum to 5.

## Complexity

Both pointers advance at most n positions, giving O(n) total time.
Only a constant number of counters is stored, so auxiliary space is O(1).
The answer may be as large as n(n + 1)/2 when every interval is valid.

## Edge cases

An empty array contributes zero subarrays.
With `k = 0`, only intervals composed entirely of good days count.
A budget exceeding the total number of bad days includes every nonempty subarray.
The helper returns zero for a negative budget.

## Common mistakes

Count all valid suffixes at each endpoint, rather than adding only one for the current window.
Sales equal to 10 are good.
Repair the window completely before counting, otherwise intervals that exceed the budget would be included.

## Language notes

Python adds and subtracts Boolean comparisons directly because they behave as zero or one.
Java uses explicit conditionals and stores `total` as `long` to avoid overflow.
The local spec also declares a `long` return value.
