## Intuition

Exactly `k` bad days can be counted as two nested sets of intervals.
Take all subarrays with at most `k` bad days and remove those with at most `k - 1`, leaving precisely the requested count.

## Brute force

Testing every subarray independently takes quadratic time.
A single window that only counts one interval when its bad day count equals `k` misses other starting positions, especially when good days extend either side.

## Approach

Compute `_at_most(sales, k) - _at_most(sales, k - 1)`.
Each helper maintains `left` and `bad`, shrinking until its budget holds.
For each right endpoint, add every valid suffix through `right - left + 1`.
A negative budget returns zero immediately.

## Walkthrough

In Example 1, `[0, 20, 5]` has five intervals containing at most one bad day.
Only `[20]` has no bad days.
Subtracting gives 4: `[0]`, `[0, 20]`, `[20, 5]`, and `[5]`.
The full three day interval has two bad days and is excluded.

## Complexity

Each helper moves both endpoints only forward, so two passes still take O(n) total time.
Auxiliary space is O(1).
The count can grow quadratically in n even though the computation itself is linear, requiring a sufficiently wide result type.

## Edge cases

For `k = 0`, subtracting the negative budget result correctly leaves all good only intervals.
An empty array yields zero.
If `k` exceeds the total number of bad days, both at most counts are equal and their difference is zero.

## Common mistakes

The subtraction must use `k - 1`, not `k + 1`.
Do not interpret values below 10 as numerical costs; each such day contributes exactly one.
Never count empty intervals, since the window contribution already counts only nonempty suffixes.

## Language notes

Python uses arbitrary precision integers for totals and Boolean arithmetic for bad day contributions.
Java uses `long total` and passes `k - 1L` to its helper.
Both references evaluate the same two independent window scans without modifying sales.
