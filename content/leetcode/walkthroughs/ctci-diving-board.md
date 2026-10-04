## Intuition

Only the number of longer planks affects the total length.
Their ordering does not matter because every arrangement with the same count has the same sum.
Enumerating that count from zero through k therefore finds every attainable length directly.

## Brute force

Generate all two-to-the-k choices of plank types and add each arrangement's length to a set.
This produces many duplicate totals because changing the positions of identical plank types does not change the sum.

## Approach

Return an empty list when k is zero, following the local contract.
If shorter and longer are equal, return the single value `k * shorter`.
Otherwise, for each `long_count` from zero to k, calculate `shorter * (k - long_count) + longer * long_count`.
Each step replaces one short plank with a longer one, increasing the total by the fixed positive difference.
The generated values are therefore distinct and already sorted.

## Walkthrough

Example 1 uses three planks, with shorter equal to one and longer equal to two.
Zero longer planks give `3 * 1 = 3`.
One longer plank gives `2 * 1 + 1 * 2 = 4`.
Two longer planks give `1 * 1 + 2 * 2 = 5`.
Three longer planks give 6.
Return `[3, 4, 5, 6]`.

## Complexity

For distinct plank lengths, time and returned-output space are O(k).
Only constant additional bookkeeping is required.
The equal-length and zero-plank cases take O(1) time and output space.

## Edge cases

Equal plank lengths must produce one result rather than k plus one duplicates.
The specified zero-plank result is an empty list, not a list containing zero.
A single plank produces the two available lengths when they differ.

## Common mistakes

Treating plank order as a new answer duplicates equivalent totals.
Forgetting the inclusive upper count omits the all-longer arrangement.

## Language notes

Python expresses the count enumeration with a list comprehension.
The arithmetic corresponds directly to the Java loop over the longer-plank count; no sorting or hash set is needed after generation.
