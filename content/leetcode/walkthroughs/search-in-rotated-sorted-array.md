## Intuition

Although the full rotated array is not sorted, at least one half around its midpoint is sorted.
Check whether `target` falls within that sorted half's value range to choose the next search interval.
Distinct values let the algorithm identify the sorted half without ambiguity.

## Brute force

A linear scan finds the target in O(n) time and O(1) space.
The required O(log n) bound instead calls for discarding half the candidates at each step.

## Approach

1. Use modified binary search on the inclusive interval `[left, right]`.
2. Return `middle` immediately if `nums[middle] == target`.
3. If `nums[left] <= nums[middle]`, the left half is sorted; search it exactly when `nums[left] <= target < nums[middle]`.
4. Otherwise, the right half is sorted; search it exactly when `nums[middle] < target <= nums[right]`.
5. Exclude `middle` when updating the chosen half, since its value has already been checked.
6. Return -1 when the candidate interval becomes empty.

Java extracts the range decision into `targetIsOnLeft`; Python expresses the same cases directly in the loop.

## Walkthrough

Example 1 uses `[6, 8, 1, 3, 4]` with `target = 3`.

| `left` | `right` | `middle` | Decision |
| --- | --- | --- | --- |
| 0 | 4 | 2 | Value 1 differs; right half `[1, 3, 4]` is sorted and contains 3 |
| 3 | 4 | 3 | Value 3 matches; return index 3 |

The first update sets `left` to 3 rather than 2 because the midpoint was already ruled out.

## Complexity

- Time: O(log n), with a halving search interval.
- Space: O(1), because the search uses indices and no copied subarrays.

## Edge cases

An absent target eventually produces `left > right`.
A singleton is tested before any half is discarded.
An unrotated array behaves like ordinary binary search.
Targets equal to a range endpoint remain eligible because the outer comparisons include equality.

## Common mistakes

- Choosing a side using only `target < nums[middle]` ignores rotation.
- Omitting endpoint equality can discard an existing target.
- Updating an endpoint to the unchanged midpoint can prevent progress.

## Language notes

Both references preserve original indices because they never sort or modify `nums`.
Java uses a private boolean helper to keep branching manageable.
Its midpoint formula avoids index addition overflow, while Python's integers are unbounded.
