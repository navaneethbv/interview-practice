## Intuition

A bulk booking changes a whole interval by the same amount.
Record where that contribution begins and ends, then recover all final totals with one prefix scan.

## Brute force

Adding c directly to every slot in every booking takes O(nm) time for n slots and m bookings in the worst case.
A difference array reduces each interval update to two boundary changes.

## Approach

Allocate `delta` with n + 1 entries.
For each inclusive interval `[l, r]`, add c at l and subtract c at `r + 1`.
While scanning slots, accumulate `running` and add it to the slot's original booking count.
The helper stores these final values in `totals`.
Count only totals strictly greater than `cap`.
The running prefix includes exactly the bookings that have begun but have not yet passed their ending slot, which establishes the correctness of each recovered total.

## Walkthrough

```text
Input: slots = [0, 0, 0, 0, 0, 0], bookings = [[0, 3, 4], [2, 5, 1], [4, 4, 3]], cap = 5
Output: 0
```

In Example 1, the first booking contributes four to slots 0 through 3.
The second contributes one to slots 2 through 5, and the third contributes three only to slot 4.
The recovered totals are `[4, 4, 5, 5, 4, 1]`.
The capacity is 5, so the two slots equal to 5 are still allowed.
No total exceeds capacity and the answer is zero.

## Complexity

Time is O(n + m).
The reference stores both `delta` and `totals`, using O(n) extra space.
The original slots are not modified.

## Edge cases

A booking ending at the final slot writes its cancellation into the extra sentinel entry.
No bookings means only original counts are tested.
Overlapping intervals add their contributions normally.

## Common mistakes

Subtracting at r instead of `r + 1` excludes the last booked slot.
Using greater-than-or-equal incorrectly marks exactly-full slots as overbooked.

## Language notes

Python integers expand as totals grow.
Java uses long arrays and a long prefix sum because many overlapping bookings can exceed an int total.
