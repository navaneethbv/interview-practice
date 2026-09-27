## Intuition

Only the relative order of alphanumeric characters matters after punctuation is ignored.
Compare meaningful characters from both ends, skipping irrelevant ones before each comparison.
This avoids allocating a normalized copy of the entire string.

## Brute force

Build a lowercase string containing only alphanumeric characters and compare it with its reverse.
This is O(n) time but O(n) extra space.
Two pointers perform the same comparisons with constant auxiliary space.

## Approach

1. Initialize `left` at the start and `right` at the end of `s`.
2. If the left character is not alphanumeric, advance `left`.
3. Otherwise, if the right character is not alphanumeric, retreat `right`.
4. Compare the lowercase forms of the two meaningful characters; return false on a mismatch.
5. Move both pointers inward after a match and return true when they meet or cross.

Skipped characters never participate in the normalized sequence.
Every successful comparison removes a matching outer pair from that sequence, reducing the problem to its interior.

## Walkthrough

Example 1 is `"Never odd or even"`.
After skipping spaces as necessary, the comparisons use these original positions:

| `left`, `right` | Lowercase comparison |
| --- | --- |
| 0, 16 | n = n |
| 1, 15 | e = e |
| 2, 14 | v = v |
| 3, 13 | e = e |
| 4, 11 | r = r |
| 6, 10 | o = o |
| 7, 8 | d = d |

The pointers cross after all pairs match, so return true.

## Complexity

- Time: O(n), since each pointer moves monotonically across the string.
- Space: O(1), retaining only indices and constant-size character conversions.

## Edge cases

A punctuation-only string has an empty normalized sequence and returns true.
Digits are alphanumeric and must be compared, so `0P` returns false.
A single meaningful character is a palindrome.
Mixed uppercase and lowercase versions of the same letter match.

## Common mistakes

- Filtering only letters incorrectly drops digits.
- Comparing without case normalization rejects valid mixed-case palindromes.
- Moving both pointers when only one side is punctuation can skip a required comparison.

## Language notes

Python uses `isalnum` and `lower` on individual characters.
Java uses `Character.isLetterOrDigit` and `Character.toLowerCase`.
Their behavior agrees for the printable ASCII input guaranteed here; broader Unicode normalization would require a separately defined contract.
