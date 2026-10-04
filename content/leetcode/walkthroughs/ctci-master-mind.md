## Intuition

Exact-position matches must be reserved before counting correct colors in wrong positions.
Otherwise a color already credited as a hit could also be counted as a pseudo-hit.
Among the remaining positions, each occurrence can satisfy at most one guessed occurrence.

## Brute force

For each guessed color, search the solution for a usable matching color while tracking consumed positions.
This requires careful bookkeeping and can take quadratic time when generalized to longer strings.
Counting unmatched colors makes consumption explicit.

## Approach

In the first pass, increment `hits` whenever the two characters at a position agree.
For every mismatch, increment the actual solution color in `unmatched`.
In a second pass over mismatched positions, check whether the guessed color has a remaining positive count.
If so, decrement that count and increment `pseudo_hits`.
Return hits first and pseudo-hits second.
The frequency decrement ensures no unmatched solution occurrence is credited twice.

## Walkthrough

Example 1 compares solution `RGBY` with guess `GGRR`.
The G at index 1 is an exact hit and is excluded from both unmatched pools.
The remaining actual colors are R, B, and Y.
The guessed G at index 0 finds no unmatched G.
The guessed R at index 2 consumes the one available R, producing one pseudo-hit.
The final R cannot consume it again.
Return `[1, 1]`.

## Complexity

For strings of length n and c possible colors, time is O(n) and auxiliary space is O(c).
Both n and the color alphabet are fixed small constants in this exercise.

## Edge cases

All exact matches produce no pseudo-hits.
Repeated colors are limited by their available unmatched frequency.
No shared colors produce two zero counts.

## Common mistakes

Counting color overlap before reserving exact hits double-counts some occurrences.
Using a set instead of frequencies loses multiplicity information for repeated colors.

## Language notes

Python stores unmatched counts in a dictionary and decrements them during the second pass.
The Java reference follows the same two-pass separation, so neither implementation depends on the order in which exact hits are discovered.
