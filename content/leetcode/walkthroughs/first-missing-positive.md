## Intuition

With `length` positions, the only values that can determine the answer are 1 through `length`.
Place each valid value `v` at index `v - 1`, using swaps until the current position is settled.
After that arrangement, the first index whose value is not `index + 1` identifies the missing positive.

## Brute force

Sorting the input and scanning for a gap takes O(n log n) time.
A set gives linear time but uses O(n) extra space, while the cyclic placement uses the allowed input array itself.

## Approach

1. For every `index`, keep swapping while `nums[index]` is in range and its target slot does not already contain it.
2. Scan with one-based `index` values.
3. Return the first index whose `value` differs from its expected positive number, or `length + 1` if every slot matches.

## Walkthrough

Example 1 starts with `[3, 4, -1, 1]`.

| position | array after placement | observation |
| ---: | --- | --- |
| 0 | `[ -1, 4, 3, 1]` | 3 moves to index 2, then -1 stops |
| 1, first swap | `[-1, 1, 3, 4]` | 4 moves to index 3 |
| 1, second swap | `[1, -1, 3, 4]` | 1 moves to index 0 |
| scan | `[1, -1, 3, 4]` | zero-based index 1 should hold 2, but holds -1 |

The first missing positive is 2.

## Complexity

- Time: O(n), because each successful swap places a value into its final slot and the scans are linear.
- Space: O(1) auxiliary, modifying `nums` in place.

## Edge cases

Negative values, zero, and values larger than `length` are ignored as placement candidates.
Duplicates stop swapping when their target slot already contains the same value.
If all values 1 through `length` occur, the answer is `length + 1`.
The method handles the full signed integer input range without arithmetic on the values except indexing after bounds checks.

## Common mistakes

- Using a set violates the constant-space requirement.
- Swapping equal duplicates forever requires the target-slot inequality guard.
- Returning the first empty array slot rather than the first mismatched expected value mishandles duplicates.

## Language notes

Python uses tuple assignment for each in-place swap.
Java uses a private `swap` helper and checks bounds before indexing `nums[nums[index] - 1]`.
Both references retain the original array mutation expected by the judge.
