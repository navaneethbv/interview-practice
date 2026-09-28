## Intuition
A subarray is nice when no bit is set in two different values.
The bitwise OR of its values therefore acts as a compact occupancy mask, and a new value fits exactly when `(mask & value) == 0`.

## Brute force
Checking every subarray and recomputing its OR can take O(N^2) time.
A sliding window removes old values with XOR because each bit appears at most once inside a valid window.

## Approach
1. Keep `left`, an occupancy mask, and the best window length.
2. While the next value overlaps the mask, remove `nums[left]` with XOR and advance `left`.
3. Add the next value with OR and update the maximum length.
4. Continue until every value has been considered.

## Walkthrough
Example 1 is `[1,3,8,48,10]`.
The window starts with 1, but 3 shares bit 0, so remove 1 and keep `[3]`.
8 has no common bit with 3, and 48 has bits 4 and 5, so `[3,8,48]` is nice with length 3.
10 overlaps 8 through bit 3 and also overlaps 3 through bit 1, so remove 3 and then 8 before adding 10, leaving a shorter valid window.
The maximum remains 3.

## Complexity
Each value enters and leaves the window at most once, so the time is O(N).
The mask and indices use O(1) auxiliary space beyond the input.

## Edge cases
One value is always a nice subarray.
Zero shares no bits and can remain beside any values.
When a value overlaps several earlier values, remove from the left until all conflicts disappear.

## Common mistakes
Using OR to remove a value leaves bits that no longer belong to the window.
Removing only one conflicting value may leave another overlap.
Testing equality of sums is unrelated to the bitwise condition.

## Language notes
Python uses integer OR and XOR directly on the sliding mask.
Java uses `int` bit operations, which match the local value range.
