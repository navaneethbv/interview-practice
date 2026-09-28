## Intuition

Suppose every value from `1` through `next_missing - 1` is currently representable.
If the next sorted number is at most `next_missing`, adding it extends the covered interval to `next_missing + value - 1`.
Otherwise, patching with exactly `next_missing` is the largest safe extension, doubling the covered endpoint.

## Brute force

One could try every possible positive patch value and repeatedly enumerate subset sums to check coverage.
Subset enumeration is exponential in the number of values, and trying patch combinations obscures the simple coverage invariant.

## Approach

1. Set `next_missing = 1`, meaning every value below it is covered.
2. Consume the next `nums` value when it is no greater than `next_missing`.
3. When it is too large or exhausted, add a patch equal to `next_missing` and double the covered range.
4. Stop when `next_missing` exceeds `n`, and return the number of patches.

## Walkthrough

For Example 1, `nums = [1, 3]` and `n = 6`.

| action | value used or added | covered values after action | next_missing |
| --- | --- | --- | --- |
| consume | 1 | 1 through 1 | 2 |
| patch | 2 | 1 through 3 | 4 |
| consume | 3 | 1 through 6 | 7 |

`next_missing` is now beyond 6, so the minimum patch count is `1`.

## Complexity

The scan uses `O(len(nums) + patches)` time, and the greedy loop makes at most logarithmically many patches when the input is sparse.
The algorithm uses `O(1)` extra space.

## Edge cases

An empty usable prefix causes a patch of 1, while duplicate values are consumed as separate subset elements.
The Java reference uses `long` for `next_missing` because `n` can reach the signed integer limit and doubling can overflow `int`.

## Common mistakes

- Patching with an arbitrary value smaller than `next_missing` fails to extend the gap.
- Using a number greater than `next_missing` leaves that missing value uncovered.
- Treating `nums` as a set loses the fact that each occurrence is independently usable.

## Language notes

Python integers grow automatically, but Java must widen the coverage variable before doubling it.
Both versions rely on the statement's guarantee that `nums` is sorted and contains positive values.
