## Intuition

A rectangle sum can be answered from four prefix rectangles if each prefix includes rows and columns before a boundary.
The extra zero row and column make every inclusion-exclusion lookup valid even when the requested rectangle touches index zero.

## Brute force

Adding every cell for every `sumRegion` query costs O(RC) per call.
That is wasteful when the matrix is immutable and many queries reuse the same cells.

## Approach

1. Build `prefix[row + 1][column + 1]` as the sum of the rectangle from the origin through that matrix cell.
2. For a query, take the large prefix and subtract the two outside strips, then add back their overlap.
3. Store the prefix table once in the constructor.

## Walkthrough

For Example 1, the matrix is `[[1,2],[3,4]]`.
The prefix table has rows `[0,0,0]`, `[0,1,3]`, and `[0,4,10]`.
The query `(0,0,1,1)` reads 10 directly.
The query `(0,1,1,1)` reads the full prefix 10 and subtracts the left column prefix 4, leaving 6.

## Complexity

For R rows and C columns, construction costs O(RC) time and the prefix table uses O(RC) space.
Each query costs O(1) time.
Python stores integer entries in nested lists, while Java uses a `long` table before returning the contract's `int` result.
The Java cast preserves the declared judge signature, so callers must keep returned rectangle sums within its representable `int` range even though prefix intermediates are widened.

## Edge cases

The padded border handles a one-cell matrix and rectangles beginning at row zero or column zero.
Negative values are included by the same formula.

## Common mistakes

Do not use an inclusive prefix without padding unless every boundary case is handled separately.
Do not subtract the overlap twice.
Do not rebuild sums during each query.

## Language notes

Python's list comprehension creates the complete two-dimensional table.
Java's `long` prefixes prevent intermediate addition from narrowing before the final cast.
