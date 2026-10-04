## Intuition

The sum missing from the full range equals the sum of the two absent numbers.
Their average lies between them, so dividing the range at that average isolates exactly one missing number on each side.
A second sum difference can then recover the smaller missing value directly.

## Brute force

Build a set of present numbers and scan from one through n for absent entries.
This takes O(n) time but O(n) auxiliary space.
The arithmetic method keeps the linear scan while eliminating the presence structure.

## Approach

Set n to the input length plus two.
Subtract the actual input sum from `n * (n + 1) / 2` to obtain `missing_sum`.
Let `pivot` be its integer half.
Subtract the sum of supplied values at most pivot from the complete sum of one through pivot.
The difference is `smaller`; the other missing number is `missing_sum - smaller`.
Because the missing values are distinct, the smaller lies at or below the pivot and the larger lies above it.

## Walkthrough

Example 1 supplies `[1, 3, 5]`, so n is 5.
The full sum is 15 and the present sum is 9, giving missing sum 6.
The pivot is 3.
The full lower-range sum is `1 + 2 + 3 = 6`, while present lower values sum to `1 + 3 = 4`.
The smaller missing value is 2, and the other is `6 - 2 = 4`.
Return `[2, 4]`.

## Complexity

Two scans of the input take O(n) time.
Auxiliary space is O(1), excluding the constant-size returned pair.
No sorting or input mutation is required.

## Edge cases

An empty supplied array represents range 1 through 2 and returns both numbers.
Missing endpoints work with the same split.
The input guarantees distinct present values within the range.

## Common mistakes

The range size is length plus two, not the largest present element.
Dividing the range at n's midpoint does not necessarily separate the missing values.

## Language notes

Python arithmetic is arbitrary precision.
Java promotes n and the triangular-sum calculations to long before multiplication, then casts the guaranteed in-range missing values back to int.
