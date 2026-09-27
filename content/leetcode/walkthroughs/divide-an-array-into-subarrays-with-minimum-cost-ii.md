## Intuition

The first piece always contributes `nums[0]`; the other `k - 1` starts must be selected from a sliding candidate window.
A Fenwick tree stores counts and sums by value, allowing the sum of the smallest required candidates after each window shift.

## Brute force

Enumerating every set of `k - 1` starts is exponential.
Sorting each candidate window from scratch costs `O(n dist log dist)` and is unnecessary when only order statistics change incrementally.

## Approach

1. Coordinate-compress values after index zero.
2. Initialize the window covering possible later starts and update Fenwick counts and sums.
3. Query the sum of the smallest `k - 1` values.
4. Slide the window by removing its left value and adding its right value, then minimize the query result.
5. Add `nums[0]` to the best later-start sum.

## Walkthrough

For Example 1, `nums = [5, 2, 4, 1, 3]`, `k = 3`, and `dist = 2`.
The first window contains starts 1 through 3 with values 2, 4, and 1.
The two smallest are 1 and 2, giving total `5 + 1 + 2 = 8`.
The next window replaces value 2 with 3, whose two smallest values are still 1 and 3, so 8 remains optimal.

## Complexity

Compression costs `O(n log n)`, and each of `O(n)` updates and queries costs `O(log n)`.
Fenwick counts, sums, and compressed values use `O(n)` space.

## Edge cases

The statement guarantees `dist >= k - 2`, so every window can supply `k - 1` starts.
Duplicate values are represented by counts and remain separate selectable positions.

## Common mistakes

- Including index zero in the Fenwick window double-counts the first piece.
- Removing the wrong outgoing index shifts the candidate interval incorrectly.
- Querying arbitrary values instead of the smallest `k - 1` loses the cost minimum.

## Language notes

Python passes Fenwick arrays to helpers, while Java keeps them as fields because its helper methods share compressed state.
Java stores sums in `long` because values and selected counts can produce large totals.
