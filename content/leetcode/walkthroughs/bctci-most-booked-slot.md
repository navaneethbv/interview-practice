## Intuition

A bulk booking affects a whole interval, but its contribution changes only at the interval's start and immediately after its end.
Record those changes, then accumulate them once across all slots.
This replaces repeated range updates with a difference array.

## Brute force

For every booking, visit every slot from its left endpoint through its right endpoint and add the booking count.
In the worst case, b bookings each cover n slots, giving O(n times b) work.

## Approach

Allocate `delta` with one extra position beyond the final slot.
For booking `[l, r, c]`, add c at `delta[l]` and subtract c at `delta[r + 1]`.
During a left-to-right scan, maintain `running`, the total active bulk contribution.
Add that amount to the original slot count and store the resulting total.
Choose the index of the largest total, preserving the earliest index when totals tie.
The extra delta position makes a booking ending at the final slot straightforward without a special boundary case.

## Walkthrough

Example 1 starts with six zeros.
The three bookings produce final totals `[4, 4, 5, 5, 4, 1]`.
The first booking contributes four through index 3, the second contributes one from index 2 onward, and the third adds three only at index 4.
Indices 2 and 3 tie at five bookings.
The earliest-index rule therefore returns 2.

## Complexity

For n slots and b bookings, both references take O(n + b) time.
The difference and totals arrays require O(n) space.
Python performs separate maximum and index scans, but their combined cost remains linear.

## Edge cases

No bulk bookings means the original slot counts determine the answer.
A single-slot interval still needs both its start addition and following subtraction.

## Common mistakes

Subtract at `r + 1`, not r, because interval endpoints are inclusive.
Replacing the winner on equal totals would choose the latest tied slot.

## Language notes

Python's `index(max(totals))` naturally returns the first maximum.
Java uses `long` for accumulated booking counts and updates the winning index only on a strict increase.
