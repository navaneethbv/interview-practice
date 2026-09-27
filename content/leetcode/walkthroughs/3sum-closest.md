## Intuition

Sorting makes the sum change predictably when either pointer moves.
For a fixed `first_index`, moving `left` right increases the sum, while moving `right` left decreases it.
That lets one two-pointer scan represent all pairs for the fixed first value.

## Brute force

Checking every triple takes O(n³), which is too slow even for moderate arrays.
Sorting once and reducing each fixed-first search to two pointers removes one loop.

## Approach

1. Sort `nums` and initialize `best` with the first triple's sum.
2. For each `first_index`, set `left` and `right` around the remaining range.
3. Update `best` when `total` is closer to `target`.
4. Move `left` when `total` is too small, otherwise move `right`.
5. Return immediately for an exact match, or return `best` after all scans.

## Walkthrough

Example 1 sorts `[-1, 2, 1, -4]` into `[-4, -1, 1, 2]` with target 1.

| `first_index` value | `left` value | `right` value | `total` | `best` |
| ---: | ---: | ---: | ---: | ---: |
| -4 | -1 | 2 | -3 | -3 |
| -4 | 1 | 2 | -1 | -1 |
| -1 | 1 | 2 | 2 | 2 |

The closest sum is 2, one away from the target.

## Complexity

- Time: O(n²), after O(n log n) sorting, because each fixed first value scans the remaining range once.
- Space: O(n) auxiliary in Python for sorting workspace, while Java's primitive sort uses O(log n) stack space.

## Edge cases

The constraints provide at least three values, so the initial triple exists.
An exact target returns without scanning remaining pairs.
Negative and duplicate values work because the pointer comparisons use the sorted numeric order.
The input is intentionally sorted in place.

## Common mistakes

- Moving both pointers after every sum can skip a closer candidate.
- Moving the wrong pointer breaks the monotonic sum direction.
- Claiming constant extra space ignores Python's in-place sort workspace.

## Language notes

Python's `nums.sort()` can allocate temporary workspace during sorting.
Java uses `Arrays.sort` and integer arithmetic for sums, matching the spec's integer contract.
Both implementations keep the original `target` unchanged while updating `best`.
