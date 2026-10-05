## Intuition

Moving all values toward a target costs weighted absolute distance.
The minimum is attained at a weighted median, where at least half the total cost weight lies on each side.

## Brute force

Trying every integer target in the full value range can be huge.
Sorting values and locating the weighted median needs one candidate.

## Approach

1. Pair each value with its adjustment cost and sort by value.
2. Find the first value whose cumulative weight reaches half the total weight.
3. Sum `abs(value - target) * cost` over the original pairs.
4. Return the weighted total.

## Walkthrough

For Example 1, sorted value-cost pairs are `(1,2),(2,14),(3,3),(5,1)`.
The total weight is 20, so the half threshold is 10.
The pair at value 2 crosses that threshold, and moving values to 2 costs 2, 0, 3, and 3, totaling 8.

## Complexity

Sorting costs O(n log n), and the two scans cost O(n).
Python's `sorted(zip(..))` creates O(n) pair storage; Java creates an O(n) two-column pair array.
The final cost uses Python integers or Java `long` arithmetic.

## Edge cases

Equal values with any costs need zero movement.
A very large weight makes its value the weighted median.
The target can be any integer, but a data value is always an optimal choice here.

## Common mistakes

Use costs as weights, not as distances.
Find the weighted median before computing the final sum.
Use wide arithmetic for the total cost.

## Language notes

Python computes the threshold `(sum(cost)+1)//2`.
Java uses `(totalCost+1)/2` with `long` total weight.
