## Intuition

A stone is a jewel exactly when its character appears in the jewels string.
Store the jewel characters in a membership set and count matching stones.

## Brute force

Comparing every stone with every jewel takes O(JS) time.
It repeats the same membership comparisons for each stone.

## Approach

1. Build a set containing the jewel characters.
2. Scan stones once.
3. Increment the answer whenever the current stone is in the set.

## Walkthrough

Example 1:

For jewels aA, the set contains lowercase a and uppercase A as separate characters.
The stones aAAbbbb contain one a and two A characters.
The count is therefore 3.
The repeated uppercase A occurrences are counted independently because stones represent separate pieces.

## Complexity

The Python set solution takes O(J+S) expected time and O(J) extra space.
The Java reference uses String.indexOf for each stone, so its time is O(JS) in the worst case and its extra space is O(1).
Both scan all stones exactly once at the outer level.

## Edge cases

Character case matters, so a and A are different.
Repeated stones each contribute separately.
When no stone is a jewel, the answer is zero.

## Common mistakes

Do not count distinct jewel types instead of stone occurrences.
Do not normalize character case unless the contract requests it.
Do not stop after finding one matching stone.

## Language notes

Python uses a set for expected constant-time membership.
Java keeps the compact contract-friendly String membership check and therefore has a different worst-case bound.
