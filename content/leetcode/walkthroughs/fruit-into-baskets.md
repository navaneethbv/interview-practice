## Intuition

The picked segment must contain at most two fruit types.
Use a sliding window and move its left edge until the window again satisfies that rule.

## Brute force

Checking every subarray and counting its fruit types takes O(n squared) time or more.
The same prefixes are counted repeatedly.

## Approach

1. Add each rightmost fruit to a frequency map.
2. While the map contains three types, remove fruits from the left.
3. Record the largest valid window length.

## Walkthrough

Example 1:

For [1,2,1], the window grows from [1] to [1,2] and then [1,2,1].
It never contains more than two distinct types.
The largest valid length is 3.
The window is the longest contiguous segment because the two baskets cannot skip an intervening fruit.

## Complexity

Each fruit enters and leaves the window once, so time is O(n).
The map contains at most three keys during an iteration and at most two after shrinking, giving O(1) extra space under this contract.
Both language references use hash maps with expected constant-time updates.

## Edge cases

A single fruit gives one.
All equal fruits form one valid window.
The answer is zero only for an empty input if such input is supplied outside the stated constraints.

## Common mistakes

Do not remove the whole left type when only one occurrence leaves.
Delete a map key when its count reaches zero.
Record the window after shrinking, not before.

## Language notes

Python uses a dictionary and Java uses HashMap.
Both references keep the input order and return only the maximum length.
