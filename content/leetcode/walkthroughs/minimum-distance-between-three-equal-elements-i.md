## Intuition

For three equal positions i<j<k, the sum of pairwise distances is `j-i + k-i + k-j = 2(k-i)`.
Therefore only the earliest of the last three occurrences matters for a triple ending at the current index.

## Brute force

Enumerating all triples is cubic.
Recording positions per value lets each new occurrence evaluate its newest possible triple immediately.

## Approach

1. Append each index to its value's occurrence list.
2. Once there are three occurrences, use the current index and the occurrence three places back.
3. Minimize the resulting doubled span.
4. Return -1 if no value reaches three occurrences.

## Walkthrough

For Example 1, value 2 occurs at indices 0, 1, and 3.
The pairwise distances are 1, 3, and 2, summing to 6.
The formula `2 * (3 - 0)` gives the same result, and no other triple exists.

## Complexity

The scan takes O(n) time and stores O(n) occurrence indices.
Python stores lists in a dictionary, while Java stores boxed indices in `List<Integer>` values.

## Edge cases

A value occurring fewer than three times cannot form a triple.
Four or more occurrences are checked through each newest triple.
The returned distance is nonnegative when a triple exists.

## Common mistakes

Use the third-last occurrence, not the immediately previous one.
Remember that all three pairwise distances are counted.
Return -1 rather than the initial sentinel when no triple exists.

## Language notes

Python uses negative list indexing for the third-last occurrence.
Java computes its position with `size - 3`.
