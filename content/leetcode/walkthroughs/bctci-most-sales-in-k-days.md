## Intuition

Adjacent periods of exactly k days overlap in all but two positions.
Subtract the departing day's sales and add the entering day's sales to maintain their totals without summing every period from scratch.
The answer is the period's starting index.

## Brute force

Compute a fresh sum for every possible k-day period.
There are n minus k plus one periods, each requiring k additions, giving O(nk) worst-case work.

## Approach

Initialize both `window` and `best` with the first k-day total and set `best_start` to zero.
For each entering `day` from k onward, add `sales[day] - sales[day - k]` to window.
Replace best and its start only when the new total is strictly greater.
The current start is `day - k + 1`.
Scanning chronologically and ignoring ties preserves the earliest maximizing period automatically.

## Walkthrough

Example 1 has sales `[8, 1, 3, 7]` and k two.
The first total is nine, starting at zero.
The next update subtracts 8 and adds 3, giving four at start one.
The last update subtracts 1 and adds 7, giving ten at start two.
That is a strict improvement, so the returned starting day is 2.

## Complexity

Time is O(n).
Java uses O(1) auxiliary space.
Python's initial `sales[:k]` slice temporarily uses O(k) extra space, although the subsequent rolling scan stores only counters.

## Edge cases

When k equals n, only start zero is possible.
When k is one, this selects the earliest maximum individual sale.
An all-zero input also returns zero because every period ties.

## Common mistakes

Do not return the maximum sum or ending index.
Updating on greater-than-or-equal would violate the earliest-start tie rule.

## Language notes

Python stores `best` and `best_start` together on improvement.
Java's integer sum is safe because at most one million values below 1,000 contribute to a period.
