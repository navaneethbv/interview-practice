## Intuition

In a sorted array, the sum of the two endpoint values tells us which endpoint can no longer help.
If the sum is too small, pairing the current left value with any smaller right value cannot reach the target.
If it is too large, pairing the current right value with any larger left value cannot help either.

## Brute force

Try all pairs of distinct positions, requiring O(n²) time.
A hash map gives expected linear time but uses O(n) extra space.
Sorted order permits a linear two-pointer scan with constant additional storage.

## Approach

1. Set `left = 0` and `right` to the final index.
2. Compute `total = numbers[left] + numbers[right]` while `left < right`.
3. If the total equals the target, return both indices plus one.
4. If the total is too small, increment `left`.
5. Otherwise decrement `right`.

Each pointer movement discards only pairs proved unable to satisfy the target.
The pointers remain ordered, ensuring two distinct positions and increasing returned indices.
The statement guarantees a solution, so a valid input always returns inside the loop.

## Walkthrough

Example 1 uses `numbers = [1, 3, 6, 10]` and `target = 9`.

| `left`, `right` | Values | `total` | Action |
| --- | --- | --- | --- |
| 0, 3 | 1, 10 | 11 | Decrease right |
| 0, 2 | 1, 6 | 7 | Increase left |
| 1, 2 | 3, 6 | 9 | Return `[2, 3]` |

The final conversion changes zero-based internal positions into the required one-based answer.

## Complexity

- Time: O(n), because each pointer moves inward at most n times in total.
- Space: O(1), using only two indices and a sum.

## Edge cases

Negative values work because the array remains numerically sorted.
Equal values at distinct positions can form the solution.
A two-element array tests its only pair directly.
Inputs without a valid pair are outside the contract.

## Common mistakes

- Returning zero-based indices violates this problem's output convention.
- Allowing `left == right` can reuse the same position.
- Moving the wrong pointer after comparing the sum discards useful candidates.

## Language notes

Python and Java use the same pointer logic and return a two-element list or array.
The sum is safely inside Java `int` under the ±1,000 bounds.
Neither implementation sorts or mutates `numbers`, since its ordering is already guaranteed.
