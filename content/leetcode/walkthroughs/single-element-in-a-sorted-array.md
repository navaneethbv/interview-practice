## Intuition

Before the single value, pairs begin at even indexes and occupy adjacent positions.
After the single value, that parity shifts, so a binary search can inspect an aligned pair and discard one half.
The search keeps an even left boundary and returns the remaining value when the bounds meet.

## Brute force

Scanning the array in pairs finds the unpaired value in O(n) time and O(1) space.
That is correct but ignores the sorted structure and does not meet the required logarithmic time.

## Approach

1. Set left to zero and right to the last index.
2. Round the midpoint down to an even index.
3. If nums[middle] equals nums[middle + 1], the pair is intact and the single value is to the right.
4. Otherwise, keep the left half including middle.
5. Continue until left equals right and return nums[left].

## Walkthrough

Example 1 uses nums = [1,1,2,3,3,4,4].

| left | right | aligned middle | pair check | next range |
| ---: | ---: | ---: | --- | --- |
| 0 | 6 | 2 | 2 != 3 | [0,2] |
| 0 | 2 | 0 | 1 == 1 | [2,2] |

The remaining value at index 2 is 2.

## Complexity

Each iteration halves the remaining index range, so time is O(log n).
Only left, right, and middle are stored, giving O(1) auxiliary space.
The method reads the sorted input without changing it.

## Edge cases

A one-element array returns that element.
If the single value is first, the first aligned pair fails and the left half is retained.
If it is last, intact pairs move the left boundary toward the final index until only that index remains.
The contract guarantees one unpaired value and paired neighbors elsewhere.

## Common mistakes

- Checking an unaligned midpoint can compare the wrong pair parity.
- Discarding middle after a mismatch can lose the single value.
- Using a linear set loses the required logarithmic search.
- Returning when a pair matches skips the possibility of a later single value.

## Language notes

Python and Java both make the midpoint even with remainder by two.
Java computes the midpoint from the bounded difference to avoid index overflow.
No language needs a collection or recursion for this binary search.
