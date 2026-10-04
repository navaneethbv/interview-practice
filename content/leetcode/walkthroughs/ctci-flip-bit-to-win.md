## Intuition

A single flipped zero can join the runs of ones immediately on either side of it.
Only two adjacent runs matter while scanning the bits.
Two consecutive zeros prevent an older run from being joined to the next one with a single flip.

## Brute force

Flip each of the 32 positions in turn and rescan the entire word to measure its longest run.
This is O(B squared) work for a B-bit word, compared with one O(B) scan.

## Approach

Mask n to 32 bits and scan from the least significant end.
`current` counts the active run of ones.
On a zero, preserve that run in `previous` only if the following bit is one; otherwise reset `previous` to zero.
Reset `current` after every zero.
Update `best` using `previous + current + 1`, where the extra one represents the flipped bit.
Clamp the final answer to 32 because a full word cannot contain a longer run.

## Walkthrough

Example 1 has 1775, binary `11011101111`.
The low run contains four ones.
The next zero saves those four as `previous` because another run begins immediately afterward.
That next run grows to three, yielding `4 + 3 + 1 = 8`.
The higher run cannot produce a longer joined sequence, so the answer remains 8.

## Complexity

Time is O(B) and extra space is O(1), with B fixed at 32 here.
No array of bits is allocated.

## Edge cases

Zero produces one, because a zero can become a single one.
An all-one word returns 32 after clamping.
Negative inputs must be treated as their complete 32-bit patterns.

## Common mistakes

Retaining a previous run across consecutive zeros incorrectly permits multiple flips.
An unbounded arithmetic shift of a negative Python integer would never reach zero.

## Language notes

Python first masks with `0xFFFFFFFF`.
Java uses unsigned right shift `>>>` while processing exactly 32 positions, avoiding sign extension during the scan.
