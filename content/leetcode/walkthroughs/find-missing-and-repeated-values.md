## Intuition

The grid has exactly `n^2` positions and should contain each value once.
Counting occurrences identifies the value with count two and the value with count zero directly.

## Brute force

For every value, scanning the whole grid to count occurrences would repeat the same work and cost `O(n^4)` time.
A single frequency array records all counts during one grid traversal.

## Approach

1. Allocate `counts` for values from 1 through `n^2`.
2. Increment the count for every grid cell.
3. Scan the count array once, storing the repeated and missing values.
4. Return them in the required `[repeated, missing]` order.

## Walkthrough

For Example 1, `grid = [[1, 2], [2, 4]]`.
The counts for 1 through 4 are `[1, 2, 0, 1]`.
Value 2 has count two and value 3 has count zero, so the result is `[2, 3]`.

## Complexity

The grid and value scan take `O(n^2)` time.
The frequency array uses `O(n^2)` extra space, and the returned pair uses constant output space.

## Edge cases

The repeated value may be at either boundary of the value range.
The constraints guarantee exactly one repeated and one missing value, so both scan results exist.

## Common mistakes

- Returning values in missing-then-repeated order violates the local contract.
- Allocating only `n` slots instead of `n^2 + 1` cannot index the largest value.
- Stopping after finding the duplicate misses the absent value.

## Language notes

Python uses a list and generator scans, while Java uses an integer array and a final loop.
Both avoid arithmetic overflow because `n^2` is at most 2500.
