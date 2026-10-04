## Intuition

A bad day ends every good-day interval that reaches it.
Keep the current good suffix length and the best length seen anywhere, resetting only the current suffix when the threshold is missed.

## Brute force

Testing all candidate intervals for all-good membership repeats the same daily checks.
A single running counter summarizes every good interval ending at the current position.

## Approach

Initialize `run` and `best` to zero.
For each sales value, increment run when the value is at least 10; otherwise set run to zero.
Update best with the maximum of its old value and run.
After each day, run is exactly the number of consecutive good days ending there.
The longest good streak must end at some day, so best captures its length when that endpoint is processed.
No second boundary or frequency map is required because a bad day completely breaks the suffix.

## Walkthrough

```text
Input: sales = [0, 14, 7, 12, 10, 20]
Output: 3
```

Example 1 starts with a bad zero-sale day, leaving run zero.
Sales 14 makes run one, then sales 7 resets it.
The values 12, 10, and 20 extend a new streak through lengths one, two, and three.
The best recorded length is therefore 3.
The earlier isolated good day does not join the later streak across the bad day.

## Complexity

The algorithm visits n days once, giving O(n) time.
Two integer counters require O(1) extra space.
The input array is neither modified nor copied.

## Edge cases

An empty input returns zero.
All-bad input also returns zero.
All-good input returns its entire length.
A day with exactly 10 sales is included.

## Common mistakes

Reset run to zero on a bad day, because that day cannot start a good streak.
Do not reset best when a streak ends.

## Language notes

Python and Java use equivalent conditional updates.
The returned length fits in an int under the stated maximum array size, and no sales totals need to be accumulated.
