## Intuition

Map each zero to -1 and each one to +1.
Two equal prefix balances enclose a segment whose transformed sum is zero, which means the segment has equally many zeroes and ones.
Keep the earliest index for each balance so a repeated balance produces the longest possible segment.

## Brute force

Checking every subarray and recounting its zeroes and ones from scratch takes O(n³).
A start-index loop with incremental counts improves that naive method to O(n²), but still repeats work across starts.
The prefix balance map turns each endpoint into one lookup and avoids recounting the interior.

## Approach

1. Set `first_index[0] = -1` to represent an empty prefix before the array.
2. Update `balance` by +1 for a one and -1 for a zero.
3. If the balance has appeared, update `longest` using the earliest index.
4. Otherwise record the current index and never replace that earliest occurrence.

## Walkthrough

Example 1 is `nums = [0, 1, 0]`.

| index | value | `balance` | stored earliest index | `longest` |
| ---: | ---: | ---: | --- | ---: |
| 0 | 0 | -1 | 0 (new entry) | 0 |
| 1 | 1 | 0 | `-1` | 2 |
| 2 | 0 | -1 | 0 | 2 |

The repeated balance 0 at index 1 identifies the first two entries as a valid segment.

## Complexity

- Time: O(n), with one map operation per input value.
- Space: O(n), because at most one entry is stored for each prefix balance.

## Edge cases

An all-zero or all-one array never repeats a useful balance beyond the initial state.
An empty prefix index of -1 is necessary when a valid segment starts at index zero.
The method treats the input values according to the binary array contract.
The longest segment may be the entire array.

## Common mistakes

- Recording every occurrence instead of the first shortens future segments.
- Using zero as the initial index loses segments beginning at index zero.
- Counting a zero as +1 makes the balance condition meaningless.

## Language notes

Python uses a dictionary with `enumerate`.
Java uses `HashMap<Integer, Integer>` and preserves the first index with `put` only in the new-balance branch.
Both references store no transformed copy of `nums`.
