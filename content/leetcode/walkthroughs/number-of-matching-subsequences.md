## Intuition

For each letter, store the sorted positions where it occurs in `s`.
A word is a subsequence when each next character can choose a position strictly after the previously chosen position.
Binary search finds that earliest valid position without rescanning `s`.

## Brute force

Scanning all of `s` separately for every character of every word costs `O(|s| * total_word_characters)` in the worst case.
Position lists share the scan of `s` and reduce each character choice to logarithmic search.

## Approach

1. Build `positions` from each character to its sorted indices in `s`.
2. For every `word`, set `previous_index = -1`.
3. For each character, binary-search the first index greater than `previous_index`.
4. Mark the word as nonmatching if no such index exists, otherwise advance the index.
5. Count each matching word independently, including duplicate entries.

## Walkthrough

For Example 1, `s = "abcde"` and words are `a`, `bb`, `acd`, and `ace`.
`a` selects position 0 and matches.
`bb` selects position 1 for its first `b`, but there is no later `b`, so it fails.
`acd` selects positions 0, 2, and 3, while `ace` selects 0, 2, and 4.
The count is `3`.

## Complexity

Building positions costs `O(|s|)` time and space.
For word length `L`, binary searches cost `O(L log |s|)`, so total matching time is `O(|s| + sum(L log |s|))`.

## Edge cases

Repeated words are processed separately and each contributes to the count.
When a character does not occur or only occurs before `previous_index`, that word fails immediately.

## Common mistakes

- Allowing the next position to equal the previous one violates subsequence order.
- Counting distinct words instead of entries undercounts duplicates.
- Using a linear search from the beginning for every character throws away the stored ordering.

## Language notes

Python uses `bisect_right`, while Java implements the same first-greater binary search in a helper method.
Both store positions for lowercase letters, matching the input alphabet.
