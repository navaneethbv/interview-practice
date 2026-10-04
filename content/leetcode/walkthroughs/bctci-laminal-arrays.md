## Intuition

Only intervals produced by repeatedly halving the whole array are eligible.
This forms a complete binary decomposition tree.
For each decomposition node, knowing its total sum and its best eligible descendant sum is enough to combine both children.

## Brute force

List every laminal interval and sum its elements independently.
There are O(n) intervals but O(n log n) total scanned elements across the decomposition levels.

## Approach

The helper `_solve(arr, start, end)` returns `(total, best)` for a half-open segment.
A single-element segment returns that element for both quantities.
Otherwise split at `mid`, recursively obtain the left and right pairs, and set `total = left_total + right_total`.
The best eligible interval is either the entire segment, some laminal interval in its left half, or one in its right half.
Return the maximum of those three candidates alongside the total.
The public method selects the best component of the root's returned pair.

## Walkthrough

Example 1 splits into `[3, -9, 2, 4]` and `[-1, 5, 5, -4]`.
Their totals are 0 and 5.
In the left half, the eligible pair `[2, 4]` has total 6, exceeding every other eligible candidate there.
The right half's best is a singleton 5.
The whole array totals 5, so combining the root chooses `max(5, 6, 5) = 6`.

## Complexity

The recursion tree has 2n - 1 nodes, each doing constant work, for O(n) time.
Its balanced recursion depth is O(log n), which is also the peak auxiliary space.

## Edge cases

A one-element array returns that element.
For all-negative input, the best answer is a negative singleton rather than an empty interval with sum zero.

## Common mistakes

Do not apply unrestricted maximum-subarray logic: arbitrary crossing intervals may not be laminal.
Use index bounds rather than copying array slices at each recursive call.

## Language notes

Python returns a pair of integers.
Java uses two-element `long[]` results to hold sums beyond int range while keeping the same total/best convention.
