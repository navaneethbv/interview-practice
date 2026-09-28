## Intuition

Removing characters from the two ends leaves one contiguous middle substring.
The removed part has at least k of every letter exactly when the retained middle has no more than the allowed remainder of each letter.
Thus we maximize a valid middle window and subtract its length from the string length.

## Brute force

Trying every left and right removal pair is quadratic.
A sliding window moves its left boundary only forward.

## Approach

1. Count all a, b, and c characters and reject if any total is below k.
2. Expand the right boundary while decrementing the counts left outside the window.
3. When an outside count falls below k, move left until the window is valid again.
4. Return `len(s) - longest_middle`.

## Walkthrough

For Example 1, `aabaaaacaabc` with k=2 starts with enough of all three letters.
The longest valid retained middle is indices 3 through 6, the substring `aaaa`.
The outside then contains eight characters with counts a=4, b=2, and c=2, so removing it takes 8 operations.
If an outside count falls below 2 while expanding the window, the left edge returns characters until validity is restored.

## Complexity

Each character enters and leaves the window at most once, so time is O(n).
The counter is O(1) because the alphabet is only a, b, and c.
Java uses a fixed three-entry array, while Python's `Counter` has constant-size effective state.

## Edge cases

k=0 returns zero because the whole string can remain.
Missing a required character returns -1.
The valid middle may be empty, requiring all characters to be removed.

## Common mistakes

Track removed counts, not counts inside the retained window.
Shrink while any required count is below k.
Do not assume the best choice removes a prefix only or a suffix only.

## Language notes

Both references preserve the string and use two moving indices.
The returned count is an operation count, not the retained length.
