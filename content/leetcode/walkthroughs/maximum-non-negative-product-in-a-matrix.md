## Intuition
A negative cell can turn the smallest negative path product into the largest positive product.
For every cell, retain both the minimum and maximum product reachable there.

## Brute force
Enumerating all right-and-down paths is exponential in the grid dimensions.
Keeping only one best product loses information when a later negative value flips the sign.

## Approach

1. For each cell, form candidate products from the minimum and maximum values arriving from above and from the left.
2. Store the minimum and maximum candidate in separate tables.
3. Initialize the top-left cell directly.
4. At the destination, return -1 if the maximum is negative; otherwise apply the modulus to that maximum.
5. The modulus is delayed because modular values cannot be compared as real products.

## Walkthrough
For Example 1, one path visits `(0,0)=1`, `(1,0)=1`, `(1,1)=-2`, `(2,1)=-4`, and `(2,2)=1`, producing product 8.
The minimum table keeps negative alternatives that may become useful after multiplying by another negative cell.
At the destination, the maximum nonnegative product is 8, so the result is 8.
In Example 2, the path through zero gives product 0 and beats the negative alternative.

## Complexity
For an R by C grid, each cell combines a constant number of candidates, so time is O(RC).
The minimum and maximum tables use O(RC) space.

## Edge cases
A zero product is nonnegative and must beat an all-negative result.
A one-cell grid returns that cell if nonnegative, otherwise -1.
Keep intermediate products in a wide numeric type.

## Common mistakes
Tracking only the maximum fails when a negative value appears.
Do not apply modulo before comparing products.
Include both incoming directions when they exist.

## Language notes
Python uses integer tables and unbounded products.
Java uses `long` tables before the final modulo conversion.
