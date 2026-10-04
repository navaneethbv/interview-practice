## Intuition

Strict containment forces the outer circle to have a larger radius.
Sorting by decreasing radius therefore fixes the only possible nesting order.
If every adjacent pair in that order is strictly contained, transitivity guarantees the entire chain is nested.

## Brute force

Try possible orders or compare every larger circle against every smaller one.
Pairwise checking takes O(n squared) time and repeats containment relationships already implied by a valid chain.

## Approach

Sort a copy of `circles` by descending radius.
For each adjacent outer and inner circle, calculate the radius gap and the differences between center coordinates.
Strict containment requires the center distance to be smaller than the radius gap.
Avoid a square root by comparing `dx * dx + dy * dy` against `gap * gap`.
Reject if the gap is nonpositive or the squared distance is at least the squared gap.
If every adjacent pair passes, return true.
The positive-gap check is essential before squaring because squaring alone loses the sign of the radius difference.

## Walkthrough

Example 1 has outer circle `(4, 4, 5)` and inner candidate `(8, 4, 2)`.
The radius gap is 3, while the center displacement is 4 horizontally and zero vertically.
The squared distance is 16 and the squared gap is 9.
Since 16 is not smaller than 9, the smaller circle protrudes beyond the larger circle rather than fitting strictly inside.
The answer is false.

## Complexity

Both references spend O(n log n) time sorting and O(n) time checking neighbors.
They copy the outer circle collection, giving O(n) auxiliary space.
The comparisons themselves use constant additional state.

## Edge cases

A single circle is nested by definition.
Equal-radius circles fail even when their centers coincide.
Internal tangency also fails because touching is forbidden.

## Common mistakes

Use a strict inequality for containment.
Comparing only radii overlooks displaced centers.

## Language notes

Python integer products have arbitrary precision.
Java stores gaps and coordinate differences in `long` before squaring, so intermediate products do not overflow `int`.
