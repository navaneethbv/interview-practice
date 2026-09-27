## Intuition

Right rotation moves the final `k` values before the first `n-k` values.
Reversing the whole array puts both blocks in reversed order, then reversing each block restores the order inside that block.
Reducing `k` modulo the array length removes full rotations.

## Brute force

Moving one final value to the front once per rotation takes O(nk) time and handles a large `k` poorly.
Copying the array into a second buffer gives O(n) time but uses O(n) extra space, while three reversals stay in place.

## Approach

1. Compute `rotations = k % len(nums)`.
2. Reverse the entire array.
3. Reverse the first `rotations` values.
4. Reverse the remaining suffix.

## Walkthrough

Example 1 rotates `[1,2,3,4,5]` by 2.

| operation | array |
| --- | --- |
| reverse all | `[5,4,3,2,1]` |
| reverse first 2 | `[4,5,3,2,1]` |
| reverse suffix from 2 | `[4,5,1,2,3]` |

The last two original values now lead the array in their original order.

## Complexity

- Time: O(n), because each reversal touches each array position at most a constant number of times.
- Space: O(1), using indices and one swap temporary.

## Edge cases

A one-element array is unchanged for every `k`.
A rotation count equal to the length reduces to zero.
Negative values move like any other values.
The input array is modified in place as specified.

## Common mistakes

- Reversing only the suffix produces the wrong internal order.
- Forgetting the modulo makes huge `k` needlessly expensive.
- Passing `rotations` instead of `rotations - 1` as the first block's right boundary reverses one extra value.

## Language notes

Python uses a nested `reverse` helper that closes over `nums`.
Java uses a private helper and passes the array explicitly.
Both implementations preserve the output argument contract and allocate no result array.
