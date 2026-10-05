## Intuition

A flipped zero can join a run of ones immediately below it with a run immediately above it.
While scanning bits from least significant to most significant, current stores the run just seen and previous stores the adjacent run that can be joined across the current zero.

## Brute force

Trying each of the 32 bit positions, flipping it, and measuring the longest run is correct.
The fixed width makes that acceptable in theory, but the two-run scan is simpler and avoids rebuilding each candidate integer.

## Approach

Treat the input as exactly 32 bits.
When the current bit is one, extend current.
When it is zero, keep current as previous only when the next higher bit is one, then reset current.
At every position, consider previous plus current plus one for flipping the zero there.
Cap the answer at 32 because no run can exceed the fixed width.

## Walkthrough

In Example 1, 1775 has a run of three ones beside a zero and a run of four ones on the other side.
Flipping that zero joins the runs and contributes eight consecutive ones.
The scan records that candidate when the zero is processed and keeps the maximum over all positions.
For Example 2, the only zero bit can be flipped to create a run of length one.

## Complexity

The scan always examines 32 positions, so it takes O(1) time.
It uses O(1) extra space.

## Edge cases

An input of zero returns one because exactly one zero can become one.
An all-one 32-bit value returns 32 even though there is no zero to flip.
Negative values include a set sign bit and must be scanned using unsigned bit movement.
Runs at either end are handled by the zero-bit adjacency check.

## Common mistakes

Scanning only the visible positive bits gives negative inputs the wrong width.
Always carrying the previous run across a zero incorrectly joins runs separated by multiple zeros.
Returning previous plus current without the flipped bit undercounts every candidate by one.

## Language notes

Python masks n with 0xFFFFFFFF before shifting so its unbounded integers behave like 32-bit values.
Java uses unsigned right shift so sign extension cannot keep adding one bits.
Both references maintain the same current, previous, and best state variables.
