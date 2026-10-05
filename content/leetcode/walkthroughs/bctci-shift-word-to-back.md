## Intuition

The selected subsequence spells exactly `word`, so its moved values are already available in the word string.
That means the scan only needs to preserve unselected characters.
Stable compaction writes those characters forward, leaving enough space to append word afterward.

## Brute force

Find the selected indices and repeatedly remove their characters and append them.
Array shifting can make this O(nm), and storing selected positions adds O(m) space.

## Approach

Track `matched`, the number of word letters already selected, and `write`, the next position for a retained character.
Scan with `read` from left to right.
When `arr[read]` matches the next required word letter, increment matched and skip copying it.
Otherwise copy the character to `arr[write]` and increment write.
Because write never exceeds read, this cannot overwrite unprocessed input.
Finally copy the letters of word into the suffix beginning at write.
The greedy matching rule selects exactly the earliest subsequence required by the statement.

## Walkthrough

Example 1 has `arr = [b, a, c, b]` and `word = "ab"`.
The first b does not match the required a, so it remains at position 0.
The a at index 1 is selected and skipped.
The c is retained at position 1, then the last b completes the selected subsequence.
The retained prefix is `[b, c]`; appending a and b produces `[b, c, a, b]`.

## Complexity

The scan and final append take O(n + m), which is O(n) because m is at most n.
Only indices are stored, so extra space is O(1).

## Edge cases

An empty word leaves the array unchanged.
When word uses the whole array, the final write simply restores those same characters in the same order.

## Common mistakes

Do not move every character whose value appears in word.
Only the greedily matched occurrences are selected, including the correct multiplicities.

## Language notes

The function returns no value in either language.
The spec grades the mutated first argument, using a Python character list or Java `char[]`.
