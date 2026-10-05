## Intuition

The requested pixels occupy a contiguous range of bits in one screen row.
The first and last bytes may be partial, while every byte between them is entirely filled.
Masks let the method set only the requested bits and preserve pixels that were already on.

## Approach

Compute the row's byte offset as `y * (width // 8)` and locate the first and last affected bytes.
Build a start mask whose leftmost active bit is `x1`, and an end mask whose rightmost active bit is `x2`.
If both columns share a byte, combine the masks and OR once.
Otherwise OR the start mask, fill interior bytes with `0xFF`, and OR the end mask.
Copy the screen first so the input remains unchanged.

## Walkthrough

For Example 1, width 16 means row one begins at byte index two.
Columns three through seven use the low five bits of the first row byte, giving mask 31.
Columns eight through ten use the high three bits of the second byte, giving mask 224.
The result is `[0, 0, 31, 224]`, and the same masks would preserve any existing one bits.

## Complexity

Let `B` be the number of bytes in the screen row and let `q` be the number of fully covered interior bytes.
Copying the screen costs `O(screen.length)` and setting the range costs `O(q)`, which is `O(screen.length)` worst case.
The returned copy uses `O(screen.length)` space.

## Edge cases

A line contained in one byte must intersect the start and end masks before updating.
An interval aligned to byte boundaries still needs the correct first and last masks.
Drawing over bytes that are already 255 leaves them unchanged because the operation is OR.

## Common mistakes

Treating the least significant bit as the leftmost pixel reverses the masks.
Forgetting the row byte offset draws into the wrong row.
Assigning zeroed masks instead of ORing them can erase pixels outside the requested line or existing set pixels.

## Language notes

Python creates `result = list(screen)` and masks the shifted end value back to one byte.
Java clones the array and uses the same integer masks, with `width / 8` for the row stride.
Both references follow the spec's inclusive `x1` and `x2` endpoints.
