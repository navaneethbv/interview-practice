## Intuition

Hits must be claimed first because a correct-position match cannot also be a pseudo-hit.
After removing those positions conceptually, a pseudo-hit exists whenever a guessed color can consume an unmatched solution color.

## Brute force

For each non-hit guess position, searching all unused solution positions would work.
A frequency map performs the same matching in linear time without tracking individual positions.

## Approach

First compare corresponding positions.
Increment hits for equal colors, and count only unmatched solution colors in unmatched.
Scan the positions again and ignore hit positions.
For every non-hit guess color with a positive unmatched count, decrement that count and increment pseudo_hits.
Each solution slot is consumed at most once by the count decrement.

## Walkthrough

In Example 1, solution RGBY and guess GGRR have one hit at the second slot.
The unmatched solution colors are R, B, and Y.
The non-hit guessed R at the third slot consumes the unmatched R, creating one pseudo-hit.
The first guessed G cannot consume the hit G, so the result is [1, 1].

## Complexity

The strings always have four slots, and the two passes take O(n) time for length n.
The color-count map uses O(c) space for c distinct colors.
With the fixed Master Mind alphabet, both bounds are constant.

## Edge cases

An all-hit guess returns all hits and zero pseudo-hits.
Repeated colors are limited by the unmatched counts.
A color present only at a hit position is not available for a pseudo-hit.
Every mismatch is ignored when no matching unmatched solution color remains.

## Common mistakes

Counting color overlap before hits allows a hit to be counted twice.
Using total color frequencies from the whole solution includes colors already claimed by hits.
Matching a pseudo-hit without decrementing its count can reuse one solution slot.

## Language notes

Python stores unmatched colors in a dictionary and uses get for absent entries.
Java uses Map.merge for counts and getOrDefault during the second pass.
Both methods return an int array in hits, pseudoHits order required by the spec.
