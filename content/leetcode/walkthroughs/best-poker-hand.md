## Intuition
The categories have a fixed priority: Flush is strongest, then Three of a Kind, Pair, and High Card.
Testing the suit condition first lets the method return immediately for a flush.
Otherwise the largest rank frequency determines the remaining category.

## Brute force
One could compare every pair and triple of the five cards to detect repeated ranks and separately compare every suit.
That is constant time for exactly five cards but obscures the category ordering.
A frequency map expresses the repeated-rank rule directly.

## Approach
1. Compare every suit with the first suit and return `Flush` if all match.
2. Count rank occurrences while tracking the largest count.
3. Return `Three of a Kind` for a count at least three.
4. Return `Pair` for a count of two, otherwise return `High Card`.

## Walkthrough
Example 1 has ranks `[1, 3, 5, 7, 9]` and five suits equal to `a`.
Each suit comparison agrees with the first card, so the method returns `Flush` before rank counts matter.
For Example 2, suits differ, so the rank map is built.
Rank 2 appears three times while ranks 4 and 5 appear once.
The largest count is 3, so the result is `Three of a Kind`.

## Complexity
The method scans five cards and uses a map with at most five rank keys.
Its time and additional space are O(1) under the fixed hand size.

## Edge cases
A four-of-a-kind still falls under the requested Three of a Kind category.
A flush takes precedence even when ranks contain a pair.
All distinct ranks with mixed suits produce High Card.

## Common mistakes
Returning Pair before checking for a triple gives the wrong category.
Treating a four-of-a-kind as a separate unsupported category violates the statement.
Checking only adjacent cards assumes ranks are sorted, which they are not.

## Language notes
Python's `Counter` supplies rank frequencies after a set-based flush check.
Java tracks frequencies in a `HashMap<Integer, Integer>` and uses a boolean flush scan.
The result strings must match the capitalization and spacing in the contract exactly.
