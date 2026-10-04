## Intuition

All sales values are nonnegative.
Extending a window cannot decrease its sum, and removing its first day cannot increase it.
Once a window exceeds twenty sales, repeatedly shrinking its left side exposes the shortest qualifying window ending at that right boundary.

## Brute force

Try every interval and track the shortest with a sum above twenty.
Even with running sums per start, this can take O(n squared) time.

## Approach

Keep `left`, `total`, and an initially impossible best length of n plus one.
Extend the right edge one day at a time, adding its sales.
While total is strictly greater than twenty, record the current length and then remove the leftmost day's contribution.
Continue shrinking until the sum is no longer sufficient.
Because values are nonnegative, a removed earlier start cannot later produce a shorter answer than the already recorded valid interval.
After scanning, return best if it was updated, or -1 if no qualifying interval existed.

## Walkthrough

Example 1 begins with 5, then 10, giving totals 5 and 15.
Adding 15 raises the total to 30, so length three is recorded.
Removing the first 5 leaves 25, allowing a better length of two.
Removing 10 then leaves 15, ending that shrink loop.
Later windows do not beat length two, so the method returns 2.
A sum of exactly twenty never qualifies.

## Complexity

Each day enters the window once and leaves at most once.
Both references run in O(n) time and O(1) auxiliary space.
The nested loop's total left-pointer movement is bounded by n.

## Edge cases

Empty input returns -1.
One day above twenty yields answer one.
Zeros may be removed during shrinking without changing the sum, but still shorten the candidate interval.

## Common mistakes

Use strictly greater than twenty, not greater-than-or-equal.
Record a valid window before subtracting its leftmost value.
The nonnegative-sales guarantee is essential to this simple sliding-window argument.

## Language notes

Python subtracts and advances left in separate statements.
Java combines index advancement with the subtraction; both keep sums safely within the stated input bounds.
