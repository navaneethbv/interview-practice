## Intuition
This larger variant still repeatedly merges the adjacent pair with the smallest sum, but rescanning all pairs after every operation is too slow.
A linked sequence plus a min-heap keeps current pairs available while lazy entries discard pairs made obsolete by earlier merges.

## Brute force
The small-variant simulation takes O(N^2) time because each merge scans every adjacent pair.
The heap version reduces each merge to logarithmic queue updates and local ordering changes.

## Approach
1. Store each value in an array with `previous` and `following` links for live neighbors.
2. Put every initial adjacent pair into a heap keyed by sum and left index.
3. Track the number of adjacent inversions instead of rescanning for sortedness.
4. Pop heap entries until one still connects live neighbors with its recorded sum.
5. Merge it, update only the inversion edges around the changed nodes, and push the two new neighboring pairs.

## Walkthrough
Example 1 is `[4,1,2]`.
The heap contains pair sums 5 at index 0 and 3 at index 1, so it merges 1 and 2 into value 3.
The links now represent `[4,3]`, and the inversion count remains one because 4 is greater than 3.
The new pair sum 7 is merged next, leaving one value and zero inversions, so the answer is 2.

## Complexity
There are at most N minus one real merges, each with O(log N) heap operations.
The total time is O(N log N), including initial heap construction and lazy stale-entry removal.
The value arrays, links, alive markers, and heap use O(N) auxiliary space.

## Edge cases
An already sorted input has zero inversions and returns immediately.
Stale heap entries are expected after neighboring merges and must be skipped by link and sum checks.
Equal values are not inversions, so the process stops when all live neighbors are nondecreasing.

## Common mistakes
Keeping only pair sums without checking live adjacency can merge a pair that no longer exists.
Updating every inversion after a merge loses the complexity advantage; only the local edges can change.
The heap tie key must include the left index to enforce the leftmost rule.

## Language notes
Python stores heap tuples `(sum, left, right)` and uses booleans for live entries.
Java stores primitive `long[]` heap records so pair sums do not overflow the input `int` range.
