## Intuition

A window is valid when it contains no more than three days below ten sales.
Extending the right end can only increase that count, and removing days from the left can only decrease it.
This monotonic behavior lets two pointers maintain the longest valid window ending at each day.

## Brute force

Consider every start and end position, counting the bad days in each interval.
Even with incremental counting per start, this requires O(n squared) time.

## Approach

Keep `left`, `cost`, and `best`, all initially zero.
For each new `right` position, add one to `cost` precisely when the new sales value is below ten.
While the count exceeds three, subtract the contribution of `sales[left]` and advance `left`.
Once this loop finishes, the window is valid and its length is `right - left + 1`.
Update `best` with that length.
The left boundary never needs to move backward: any earlier start rejected for too many bad days remains invalid after further extension.

## Walkthrough

Example 1 starts with `[0, 14, 7, 9]`, which has three bad days and length four.
Adding the next 0 creates a fourth bad day, so the first 0 leaves.
The window can then extend through 20 and 10, producing indices 1 through 6 with length six.
Adding the next 0 forces the left boundary past 14 and 7.
The final 10 produces another valid window of length six, so the result remains 6.

## Complexity

Each position enters and leaves the window at most once.
Both references therefore take O(n) time and O(1) auxiliary space.
The inner loop does not multiply the runtime by n because `left` only advances.

## Edge cases

Empty input returns zero.
All-good input returns the full length; all-bad input returns at most three.
Exactly ten sales counts as good.

## Common mistakes

Use a loop, because several good days may precede the bad day that must leave.
Update the answer only after restoring validity.

## Language notes

Python expresses the added cost with a conditional integer expression.
Java uses a `long` counter, although the number of bad days is bounded by the array length.
