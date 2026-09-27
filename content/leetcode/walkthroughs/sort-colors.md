## Intuition

The array contains only three values, so maintain three regions for zeroes, ones, and twos.
`next_zero` marks the first position that may hold a zero, while `next_two` marks the last position that may hold a two.
The `current` value remains unprocessed only when it lies between those boundaries.

## Brute force

Selection-sorting the array by repeatedly finding the next smallest color takes O(n²) time and O(1) space.
Counting zeroes, ones, and twos is a valid O(n) time, O(1) space alternative, but it needs a separate counting pass and rewrite pass.

## Approach

1. Start `next_zero` and `current` at zero, and `next_two` at the final index.
2. When `nums[current]` is zero, swap it into `next_zero` and advance both positions.
3. When it is two, swap it with `next_two` and decrease `next_two` without advancing `current`.
4. When it is one, advance `current` because it already belongs in the middle region.
5. Stop when `current` passes `next_two`.

## Walkthrough

Example 1 starts with `[2, 0, 1, 2, 0]`.

| `current` value | action | array afterward | boundaries `next_zero`, `next_two` |
| ---: | --- | --- | --- |
| 2 | swap with right | `[0, 0, 1, 2, 2]` | 0, 3 |
| 0 | swap into zero region | `[0, 0, 1, 2, 2]` | 1, 3 |
| 0 | move the second zero into place | `[0, 0, 1, 2, 2]` | 2, 3 |
| 1 | leave in middle | `[0, 0, 1, 2, 2]` | 2, 3 |
| 2 | move right boundary | `[0, 0, 1, 2, 2]` | 2, 2 |

The scan ends with all values in their required regions.

## Complexity

- Time: O(n), because every swap moves a value into a finished region or advances `current`, with n = len(nums).
- Space: O(1), using only three indices and a temporary swap value.

## Edge cases

A one-element array is already partitioned.
An array containing one value type advances or shrinks one boundary until it finishes.
When a two is swapped into `current`, it must be inspected again because it came from the unknown region.
The method mutates the original array as required by the spec.

## Common mistakes

- Advancing `current` after moving a two can leave an unprocessed value behind.
- Treating every nonzero value as a two misplaces ones.
- Calling a built-in sort ignores the in-place linear-time requirement.

## Language notes

Python swaps tuple assignments directly.
Java uses a small `swap` helper so the partition loop stays readable.
Neither language needs a counting array or a copied result.
