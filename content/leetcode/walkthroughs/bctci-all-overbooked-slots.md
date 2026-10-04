## Intuition

A booking changes a contiguous range by a constant amount.
Instead of updating each covered slot, record only where that amount begins and where it stops.
A running prefix sum reconstructs the extra bookings at each slot.

## Brute force

Apply each `[l, r, c]` booking directly to every index between its endpoints.
For n slots and b bookings this can require O(nb) updates before counting overbooked slots.

## Approach

The helper `_totals` allocates `delta` with n + 1 entries.
Add `c` at `delta[l]` and subtract `c` at `delta[r + 1]` for every inclusive booking.
Sweep the slots with `running`, adding the current delta before combining it with the original `booked` value.
Store these final values in `totals`.
The public method counts only totals strictly greater than `cap`.
At each index, `running` equals the sum of exactly those bookings whose ranges currently cover that index.

## Walkthrough

Example 1 begins with six zero slots.
The three bookings produce `delta = [4, 0, 1, 0, -1, -3, -1]`.
The first six prefix sums are `[4, 4, 5, 5, 4, 1]`, which are also the final totals because the original slots are zero.
With `cap = 5`, values equal to 5 are permitted.
No total exceeds the capacity, so the answer is 0.

## Complexity

Building changes takes O(b), and reconstructing and counting takes O(n).
Total time is O(n + b), with O(n) auxiliary space for `delta` and `totals`.

## Edge cases

With no bookings, count overcapacity values already present in `slots`.
A booking covering the last slot uses the extra sentinel entry at index n.

## Common mistakes

Subtract at `r + 1`, not at `r`.
Do not replace the strict `>` comparison with `>=`.

## Language notes

Python integers handle accumulated totals automatically.
Java uses `long[]` for changes and totals because many overlapping bookings can exceed the range of `int`.
