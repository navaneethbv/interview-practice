## Intuition

A bulk booking changes the added total only at its start and just after its end.
Recording those two boundary changes lets one prefix scan reconstruct every slot's final booking count.

## Brute force

Applying each booking to every covered slot takes O(nq) time in the worst case.
A difference array reduces each range update to two constant time operations, followed by one final reconstruction pass.

## Approach

Allocate `delta` with n + 1 entries.
For `[l, r, c]`, add c at l and subtract c at `r + 1`.
Scan slots while accumulating `running`, then add each original count to form `totals`.
Return the earliest index attaining the maximum.

## Walkthrough

Example 1 adds four bookings to slots 0 through 3, one to slots 2 through 5, and three to slot 4.
The reconstructed totals are `[4, 4, 5, 5, 4, 1]`.
Indices 2 and 3 tie at five, so the answer is 2.

## Complexity

For n slots and q bookings, time is O(n + q).
Both the difference array and reconstructed totals require O(n) space.
The final maximum scan is linear and does not change the overall time bound.

## Edge cases

No bookings means selecting the earliest maximum among original slot counts.
A single slot range still needs both boundary updates.
A booking ending at the final slot subtracts into the extra sentinel entry, avoiding an out of bounds write.

## Common mistakes

Subtract at `r + 1` because the booking includes slot r.
Remember existing bookings rather than returning only newly added counts.
On a tie, preserve the earlier answer instead of replacing it with the later equal total.

## Language notes

Python obtains the earliest maximum with `totals.index(max(totals))`.
Java changes `best` only for a strictly greater total.
Java uses `long` for delta, running additions, and totals so many overlapping bookings do not overflow an integer.
