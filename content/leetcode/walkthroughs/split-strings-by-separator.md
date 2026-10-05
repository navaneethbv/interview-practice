## Intuition
Each input word can be split independently, and the pieces must keep their original order across words.
Splitting at every separator naturally creates empty pieces for repeated, leading, or trailing separators.
Filtering those empty pieces leaves exactly the required output.

## Brute force
One could scan each character and manually build a current token, appending it whenever a separator appears.
That is already O(total input length), but language string splitting expresses the same scan more clearly.

## Approach
1. Create an empty result list.
2. Split each word at the given separator.
3. Append each nonempty piece immediately.
4. Continue with the next word so cross-word order is preserved.

## Walkthrough
Example 1 has words `["a.b", ".c."]` and separator `.`.
Splitting `"a.b"` produces `"a"` and `"b"`, both of which are appended.
Splitting `".c."` produces empty pieces, then `"c"`, then a final empty piece.
Only `"c"` survives from the second word, so the result is `["a", "b", "c"]`.

## Complexity
If L is the total number of input characters, scanning and producing pieces takes O(L) time.
The result and temporary split pieces use O(L) space in the worst case.

## Edge cases
A word made entirely of separators contributes no pieces.
A word without the separator contributes itself unchanged.
Adjacent separators create empty pieces that must be discarded.

## Common mistakes
Keeping empty strings violates the output rule.
Sorting pieces loses their original order.
Treating the separator as a regular expression can give special punctuation unexpected meaning.

## Language notes
Python's `str.split` accepts this one-character separator as a literal string.
Java scans indexes and uses `substring`, avoiding regular-expression behavior from `String.split`.
Both references append pieces in encounter order.
