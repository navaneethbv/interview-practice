## Intuition

A CIDR block must start at an address divisible by its size, a power of two. Greedily taking the largest block allowed at each step, limited by the alignment of the current address (its lowest set bit) and by how many addresses remain, produces the fewest blocks.

## Approach

1. Convert the address to a 32-bit integer.
2. While addresses remain, set size to the lowest set bit of the address (2^32 for address 0), halving it until it is at most the remaining count.
3. Emit the block with prefix length 32 - log2(size).
4. Advance the address by size and subtract size from the remaining count.

## Walkthrough

255.0.0.7 is odd, so the first block has 1 address (/32). 255.0.0.8 is divisible by 8 and 9 addresses remain, so the next block has 8 (/29). The last address, 255.0.0.16, is a /32.

## Complexity

- Time: O(log n).
- Space: O(log n) for the output.

## Edge cases

- An address of 0 is aligned to every size.
- n = 1 always gives a single /32.

## Common mistakes

- Choosing a block larger than the remaining count, which covers too many addresses.
- Using signed 32-bit arithmetic, which breaks for addresses at or above 128.0.0.0.
