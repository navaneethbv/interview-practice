## Intuition

An envelope can contain another only when both width and height are strictly larger.
Sort widths ascending but heights descending for equal widths.
Then a strictly increasing subsequence of heights cannot select two equal-width envelopes.

## Brute force

A dynamic program over every earlier envelope takes O(n squared) time after sorting.
It is correct but slow for large inputs.
The tails array with binary search reduces the subsequence phase to O(n log n).

## Approach

1. Sort by width ascending and height descending for ties.
2. Scan envelope heights in that order.
3. Find the first tails position whose height is at least the current height.
4. Replace that tails value, or append when the current subsequence grows.
5. Return the tails length.

## Walkthrough

Example 1 sorts [5,4], [6,7], [6,4], and [2,3] into widths 2, 5, then equal width 6 with heights 7 and 4.
The height sequence is 3,4,7,4.
The tails structure grows to 3,4,7 and replaces the existing 4 at index 1 with 4 for the equal-width envelope.
Its final length is 3, representing 2,3 then 5,4 then 6,7.

## Complexity

Sorting takes O(n log n).
Each height uses binary search in the tails array, adding O(n log n) time.
The tails array uses O(n) auxiliary space, and sorting may use implementation-dependent workspace.
The returned length is a scalar.

## Edge cases

Equal widths must be ordered by descending height.
Equal heights replace a tails value instead of extending a strict subsequence.
One envelope returns one.
The input arrays are sorted in place by Java and copied by Python's sorted call.

## Common mistakes

- Sorting equal widths by ascending height incorrectly allows both into a strict nesting chain.
- Using upper bound allows equal heights to extend the subsequence.
- Comparing only widths ignores the height requirement.
- Treating tails as the actual selected envelope sequence misreads the LIS invariant.

## Language notes

Python uses bisect_left on a sorted copied envelope list.
Java sorts the supplied two-dimensional array and performs an explicit lower-bound search.
Both use strict height increase through the lower bound.
