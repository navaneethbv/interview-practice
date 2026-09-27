## Intuition

A rotation creates at most one drop between neighboring values.
Comparing a midpoint with the current right endpoint tells us which side contains that drop or the minimum itself.
Distinct values make this comparison decisive, allowing binary search.

## Brute force

Scan all values and retain the smallest.
That takes O(n) time and O(1) space, but the statement specifically requires logarithmic time.

## Approach

1. Keep an inclusive candidate range from `left = 0` to `right = len(nums) - 1`.
2. While `left < right`, choose `middle` inside the range.
3. If `nums[middle] > nums[right]`, the minimum must occur after `middle`, so set `left = middle + 1`.
4. Otherwise, the minimum is at `middle` or earlier, so set `right = middle`.
5. Return `nums[left]` when the range contains one candidate.

The minimum always remains inside the candidate range.
Keeping `middle` in the second case is essential because it could be the smallest value itself.

## Walkthrough

Example 1 uses `[6, 9, 1, 3]`.

| `left` | `right` | `middle` | Comparison | New range |
| --- | --- | --- | --- | --- |
| 0 | 3 | 1 | `9 > 3` | `[2, 3]` |
| 2 | 3 | 2 | `1 <= 3` | `[2, 2]` |

The loop stops at index 2 and returns 1.
The first comparison discards both values before the rotation boundary.
The second preserves the boundary value as a candidate.

## Complexity

- Time: O(log n), because each iteration removes approximately half the candidate range.
- Space: O(1), using only three indices.

## Edge cases

An unrotated array repeatedly moves `right` toward index zero.
A one-element array skips the loop and returns that element.
Negative values do not change the ordering argument.
Duplicate values are outside this problem's contract and would require different handling.

## Common mistakes

- Using `right = middle - 1` can discard the actual minimum.
- Returning the final index instead of its value violates the contract.
- Extending this comparison unchanged to duplicate-heavy inputs can choose the wrong half.

## Language notes

Python uses integer floor division for `middle`.
Java computes `left + (right - left) / 2`, which avoids adding two potentially large indices.
Neither implementation slices or sorts the array, preserving the logarithmic running time and constant auxiliary space.
