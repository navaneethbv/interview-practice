## Intuition
The best triple is either the three largest values or the two smallest negatives with the largest value.
Sorting exposes exactly those two candidates.

## Brute force
Enumerating every triple takes O(n^3) time and keeps only the best product.
That is correct but unnecessary because any optimal triple must use one of the two sorted extremes described above.

## Approach
1. Sort a copy of the values.
2. Compute the product of the three largest values.
3. Compute the product of the two smallest values and the largest value.
4. Return the larger product.

## Walkthrough
Example 1 is `[-5, -4, 1, 3]`.
After sorting, the three largest values are `-4`, `1`, and `3`, whose product is `-12`.
The two smallest values are `-5` and `-4`, and multiplying them by the largest 3 gives 60.
The larger candidate is 60, so the method returns 60.

## Complexity
Sorting takes O(n log n) time.
The two products and comparison take O(1) additional time.
Python's sorted list and Java's cloned sorted array use O(n) auxiliary space.

## Edge cases
Three positive values use the three-largest candidate.
Two negatives can make a positive product even when the third value is positive.
The local contract supplies at least three values.

## Common mistakes
Checking only the three largest misses two negative values.
Sorting the input in place may unexpectedly mutate the judge argument.
Using narrow intermediate arithmetic can overflow Java `int` outside the local result bounds.

## Language notes
Python integers grow as needed.
Java computes with the declared integer return contract, which is safe for the local tests and problem bounds.
