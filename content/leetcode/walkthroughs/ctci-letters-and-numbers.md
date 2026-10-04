## Intuition

Map every letter to `+1` and every digit to `-1`.
Two equal prefix balances mean the elements between those prefixes contain equal numbers of letters and digits.
Keeping the first index for each balance gives the longest interval ending at every position.

## Approach

Initialize `first_seen` with balance zero at index `-1`, representing an empty prefix.
Scan `array`, increasing balance for a letter and decreasing it for a digit.
When a balance appears for the first time, store its index.
When it appears again, calculate the interval from the first occurrence and update the answer only if its length is strictly larger.

## Walkthrough

For Example 1, the running balances for `a, 1, b, c, 2, 3, d` are one, zero, one, two, one, zero, and one.
Balance zero first appears before the array and reappears after the sixth element, giving the interval from index zero through five.
The final balance one also repeats, but its interval is shorter, so the earlier six-element answer remains selected.
Example 2 never returns to balance zero after the initial prefix, so the result is empty.

## Complexity

The scan performs constant work per element, giving `O(n)` time.
The first-occurrence map uses `O(n)` space in the worst case.
Slicing the chosen range adds `O(answer length)` output work, which is bounded by `O(n)`.

## Edge cases

An empty array returns an empty slice because the initial balance has no later occurrence.
An array containing only one type cannot produce a nonempty balanced range.
Equal-length candidates keep the earliest start because the code updates only when `length > best_length`.

## Common mistakes

Overwriting the first index of a balance loses the longest possible interval ending later.
Using absolute counts independently is more cumbersome and can miss the prefix-equality shortcut.
Updating on `>=` would replace an earlier equally long answer with a later one.

## Language notes

Python uses `item.isalpha()` and returns a slice of the original list.
Java uses `Character.isLetter` and `Arrays.copyOfRange` to create the returned array.
Both references use the input name `array` and treat every nonletter permitted by the spec as a digit.
