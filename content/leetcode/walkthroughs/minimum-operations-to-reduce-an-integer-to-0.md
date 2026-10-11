## Intuition

Adding or subtracting a power of two flips one bit plus any carry or borrow. An isolated 1 bit is best removed by subtracting it. A run of consecutive 1 bits is best removed by adding 1 at its lowest position, which carries into a single higher 1 bit that can be removed later: a run of k ones costs 2 operations instead of k.

## Approach

1. While n is non-zero, look at the lowest bit.
2. If it is 1 and the next bit is also 1, add 1; if the next bit is 0, subtract 1. Count one operation.
3. Shift right and repeat.

## Walkthrough

For 39 (100111): the low bits 11 make us add 1, giving 40 (101000). The lone 1 at 8 is subtracted, giving 32, and the lone 1 at 32 is subtracted. Three operations.

## Complexity

- Time: O(log n).
- Space: O(1).

## Edge cases

- n = 3 can be 4 - 1 or 2 + 1; both take 2 operations.
- A power of two takes one operation.

## Common mistakes

- Counting the number of 1 bits, which ignores carrying runs of ones.
- Always adding at a 1 bit, which turns an isolated 1 into extra work.
