## Intuition

For a query point, choose the opposite corner of an axis-aligned square.
Its horizontal and vertical side lengths must match and be nonzero.
The other two corners are then fixed, so multiplying the occurrence counts counts distinct choices of duplicate points.

## Brute force

Trying every pair of stored points for every query is quadratic in the number of stored points.
The coordinate count map lets each distinct point act as the opposite corner in one scan.

## Approach

1. Store the number of copies at each coordinate.
2. For every stored candidate, compute the horizontal side length from the query.
3. Require a different x coordinate and equal vertical distance.
4. Multiply counts for the candidate and the two forced corners.
5. Add all products and return the total.

## Walkthrough

Example 1 adds [0,1], [1,0], and [1,1], then counts [0,0].
The candidate [1,1] has side length 1 from the query.
The forced corners are [1,0] and [0,1], each with count 1.
Their product is 1, so the count is 1.

## Complexity

- Time: O(u) per count operation, where u is the number of distinct stored points.
- Space: O(u), for point multiplicities.

## Edge cases

A candidate with the same x coordinate creates zero area and is rejected.
Missing forced corners contribute zero.
Duplicate stored points multiply the number of choices.
A count operation does not modify the map.

## Common mistakes

- Counting diagonal rectangles with unequal side lengths.
- Forgetting that duplicate occurrences are distinct choices.
- Including a candidate with zero horizontal distance.
- Mutating counts during count instead of only during add.

## Language notes

Python uses tuple keys in Counter.
Java encodes coordinates with base 1001, which is safe for coordinates from 0 through 1000.
