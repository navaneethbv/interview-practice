## Intuition

Every even-positioned bit must move one place left, and every odd-positioned bit must move one place right.
Masks isolate those two groups before shifting, so no bit can cross into the wrong group.
Combining the shifted groups performs all sixteen swaps in one expression.

## Approach

Mask `n` with `0x55555555` to keep bits at positions 0, 2, 4, and so on.
Mask it with `0xAAAAAAAA` to keep positions 1, 3, 5, and so on.
Shift the even group left by one and the odd group right by one, then OR the results.
The Python reference normalizes the result back to signed 32-bit form, while Java's `int` result already has that representation.

## Walkthrough

For Example 1, ten is binary `1010` in its low bits.
The odd mask keeps the one at bit three and shifts it to bit two, while the even mask keeps the one at bit one and shifts it to bit zero.
The combined result is `0101`, which is five.
For input one, the bit at position zero moves to position one and the result is two.

## Complexity

The algorithm uses a constant number of masks, shifts, and bitwise operations.
Its running time is `O(1)` and its auxiliary space is `O(1)`.
Because the input is a fixed-width 32-bit integer, the bound is independent of the numeric magnitude.

## Edge cases

Zero remains zero because no bits are set.
All one bits remain one after paired swaps, so negative one maps to itself.
The sign bit can move into or out of the highest position, which is why results such as negative values are valid.

## Common mistakes

Using the masks in the opposite shift directions swaps the wrong neighboring positions.
Java's signed right shift `>>` would copy the sign bit, so the reference correctly uses `>>>` for the odd group.
Failing to normalize Python's result can expose an unsigned value instead of the specified signed integer.

## Language notes

Python masks to 32 bits before shifting and converts values with the high bit set back to signed form.
Java's bitwise operations already operate on 32-bit `int` values, and `>>>` keeps zeroes entering from the left.
Both references use the exact even and odd masks required to swap every adjacent pair.
