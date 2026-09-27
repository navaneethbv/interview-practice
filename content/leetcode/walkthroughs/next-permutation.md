## Intuition

The next lexicographic ordering should change the latest possible position.
Find the rightmost `pivot` that can be increased, replace it with the smallest larger suffix value, and put the suffix in ascending order.
The suffix is descending before the swap, so reversing it creates that smallest arrangement.

## Brute force

Generating every permutation and sorting them is factorial in the input length.
Searching the sorted permutation list also uses much more memory than the in-place successor operation.

## Approach

1. Scan from the right while values decrease, leaving `pivot` at the rightmost index with `nums[pivot] < nums[pivot + 1]`.
2. If a pivot exists, find the rightmost `successor` larger than it and swap them.
3. Reverse the suffix beginning at `pivot + 1` with `reverseSuffix`.
4. If no pivot exists, the whole array was descending and reversing it returns the first ordering.

## Walkthrough

Example 1 starts with `[1, 2, 3]`.

| step | array | state |
| --- | --- | --- |
| scan | `[1, 2, 3]` | `pivot = 1`, value 2 can increase |
| successor | `[1, 2, 3]` | `successor = 2`, value 3 |
| swap | `[1, 3, 2]` | pivot value increased minimally |
| reverse suffix | `[1, 3, 2]` | suffix already has one element |

The result is the next ordering after 123.

## Complexity

- Time: O(n), with one scan for the pivot, one scan for the successor, and one suffix reversal.
- Space: O(1), using only indices and one swap temporary.

## Edge cases

An entirely descending array wraps to ascending order.
An entirely ascending array changes its final two positions.
Duplicate values are handled by the non-increasing pivot scan and rightmost successor search.
One-element and empty arrays remain unchanged.

## Common mistakes

- Choosing the leftmost pivot skips closer lexicographic successors.
- Sorting the suffix before swapping can choose the wrong replacement value.
- Forgetting the suffix reversal leaves a larger than necessary tail.

## Language notes

Python swaps tuple assignments and reverses the suffix with index swaps.
Java extracts swapping and reversing into helpers so the public method stays easy to follow.
Both references mutate the input array and return no value, matching the spec's output argument.
