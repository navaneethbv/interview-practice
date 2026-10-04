## Intuition

Replacing a bit interval requires two independent operations: clear the destination interval, then place the source bits there.
OR alone is insufficient because an existing one in N must become zero wherever M contains a zero.
The promised source width lets the insertion avoid spilling outside the interval.

## Brute force

Visit every position from i through j, clear that position in N, and copy the corresponding bit of M.
This takes time proportional to the interval width and is easy to verify, but a mask performs all replacements together.

## Approach

Compute `width = j - i + 1` because both endpoints belong to the interval.
`(1 << width) - 1` creates width low one bits.
Shift that mask left by i to obtain `window`.
AND N with the complement of `window`, clearing exactly the destination positions.
Finally OR in `M << i`.
Bits outside the window survive the clearing operation and are unaffected by the shifted source.

## Walkthrough

Example 1 has `N = 1024`, `M = 19`, `i = 2`, and `j = 6`.
The width is 5, and the window is binary `1111100`, or 124.
Those positions of 1024 are already zero.
Shifting 19, binary `10011`, left twice gives 76.
Combining 1024 and 76 yields 1100, binary `10001001100`.

## Complexity

With the fixed 31-bit nonnegative input range, time and extra space are O(1).
Only a constant number of arithmetic and bitwise operations is used.

## Edge cases

M can be zero, in which case the interval is simply cleared.
A one-bit window has width one.
The largest legal window spans positions zero through thirty.

## Common mistakes

Forgetting the inclusive endpoint loses one mask bit.
Using XOR to clear the interval merely toggles existing bits and can introduce unwanted ones.

## Language notes

Python integers support the mask directly.
Java uses `1L` while constructing the window so a width of 31 is computed safely before casting the finished mask to int.
