## Intuition

A horizontal line changes consecutive bits within one row of a byte-packed screen.
Only the first and last bytes can be partially covered.
The bytes strictly between them are entirely filled, so they can be set directly to 255.

## Brute force

Set each pixel between x1 and x2 individually using its byte index and bit offset.
That takes time proportional to the number of pixels.
Byte masks perform the same work using one operation per covered byte.

## Approach

Copy `screen` into `result` and calculate `row_start = y * (width // 8)`.
Find `first_byte` and `last_byte` using integer division by eight.
Construct a start mask covering the first endpoint through its byte's right edge and an end mask covering the final byte's left edge through x2.
If both endpoints share a byte, OR in their mask intersection.
Otherwise OR the boundary masks and fill every intervening byte with `0xFF`.

## Walkthrough

Example 1 has width 16 and y equal to 1, so the row begins at byte 2.
Columns 3 through 7 occupy the low five bits of byte 2, giving 31.
Columns 8 through 10 occupy the high three bits of byte 3, giving 224.
The untouched first row stays zero, yielding `[0, 0, 31, 224]`.

## Complexity

For s screen bytes and b covered bytes, copying plus drawing takes O(s + b) time, which is O(s).
The returned copy uses O(s) space; mask calculations need O(1) additional space.

## Edge cases

A one-pixel line uses the same-byte case.
A line covering a full byte sets it to 255.
Existing set pixels outside the line are preserved.

## Common mistakes

OR the masks into boundary bytes instead of replacing them.
The leftmost pixel uses the most significant bit, so reversing bit orientation draws the wrong columns.

## Language notes

Python copies with `list(screen)` and Java uses `clone()`.
Both store byte values as integers and mask the left-shifted ending mask to eight bits.
