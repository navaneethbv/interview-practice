## Intuition
All numbers are positive, so extending a window only increases its product.
For each right endpoint, shrink the left edge until the product is below k, then every start between left and right is valid.

## Brute force
A naive solution multiplies every subarray independently.
There are O(n^2) subarrays, and repeated multiplication can make the direct version O(n^2) time with incremental products per start.
It uses O(1) extra space but repeats work across overlapping windows.

## Approach
1. Return zero when k is at most one.
2. Multiply the new right value into the window product.
3. Divide out left values while the product is at least k.
4. Add `right - left + 1` valid subarrays ending at right.

## Walkthrough
Example 1 is `[2, 3, 4]` with k 10.
At right 0, product 2 gives one subarray `[2]`.
At right 1, product 6 gives two more ending at 1, for total 3.
At right 2, product becomes 24, so divide by 2 and then by 3 until product is 4.
Only `[4]` ends at 2 with product below 10, adding one.
The result is 4.

## Complexity
Each value enters and leaves the window at most once, giving O(n) time.
The algorithm uses O(1) auxiliary space and an integer count of O(n^2) possible subarrays.
Java uses `long` for the running product to avoid intermediate overflow.

## Edge cases
When k is one or less, no positive product qualifies.
A value equal to k forces the left edge past it.
An all-ones array counts every subarray when k exceeds one.

## Common mistakes
Adding all windows before shrinking counts invalid products.
Using a set ignores multiplicity and loses subarray boundaries.
Dividing by a zero would be invalid, but the local contract has positive values.

## Language notes
Python integer division exactly removes the positive left factor.
Java keeps the same invariant with a `long` product and integer division.
