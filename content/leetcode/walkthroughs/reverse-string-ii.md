## Intuition

Each block of 2k characters reverses only its first k characters.
The final block may be shorter, so its reversal endpoint is clamped to the string length.
Mutating a character buffer lets the same swap routine handle every block.

## Brute force

Reversing each required substring by creating many temporary strings can copy characters repeatedly.
A full reverse followed by repairs also loses the independent block boundaries.
One buffer and paired swaps process each character at most once.

## Approach

1. Convert the string to a mutable character sequence.
2. Start blocks at zero and advance by 2k.
3. Set the right endpoint to the smaller of start plus k minus one and the final index.
4. Swap inward until the block's first k characters are reversed.
5. Join or construct the buffer as the returned string.

## Walkthrough

Example 1 is abcdefg with k 2.
The first block is abcd, so ab reverses to ba while cd stays in place.
The second block efg reverses ef to fe, leaving g.
Combining the blocks returns bacdfeg.

## Complexity

Each character participates in at most one swap, so time is O(n).
Python's character list and Java's char array use O(n) auxiliary space.
The returned string also uses O(n) output storage.
The number of blocks is O(n divided by k).

## Edge cases

A block shorter than k reverses all of its characters.
A block shorter than 2k but longer than k reverses only its first k.
A one-character string is unchanged.
The statement supplies positive k.

## Common mistakes

- Reversing all 2k characters reverses the wrong half.
- Forgetting to clamp the final endpoint reads past the string.
- Advancing by k overlaps blocks and changes the pattern.
- Returning the mutable buffer rather than a string violates the contract.

## Language notes

Python converts to a list and swaps with tuple assignment.
Java uses a char array and returns a new String.
Both avoid repeated immutable substring concatenation.
