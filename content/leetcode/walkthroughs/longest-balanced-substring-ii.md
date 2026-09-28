## Intuition
With only `a`, `b`, and `c`, every balanced substring has one of four forms: one present character, two present characters with equal counts, or all three with equal counts.
Handle these forms separately using runs and prefix-count differences.

## Brute force
Testing every substring and counting its letters costs O(n^2) time.
The fixed three-character alphabet allows linear scans instead.

## Approach

1. Find the longest run containing one repeated character.
2. For each character pair, track count difference and reset at the third character.
3. For all three characters, track two independent count differences.
4. Use repeated prefix states to obtain equal-count intervals.
5. Return the largest result across all cases.

## Walkthrough

For Example 1, `s = "aabbc"`, the longest one-letter run is 2.
For the pair `a,b`, the prefix through the second `b` has equal counts, giving length 4 before `c` resets that pair scan.
The three-letter scan does not improve the result because `aabbc` has counts 2, 2, and 1.
The answer is therefore 4.
For `"cccc"`, the one-letter run covers the whole string, so the answer is 4.

## Complexity
There are three fixed pair scans, one run scan, and one three-letter scan, so time is O(n).
Each prefix map can contain O(n) entries, making auxiliary space O(n).

## Edge cases
A substring with only one present character is balanced.
A third character resets a pair scan because it cannot occur in that two-character case.
The entire string can qualify when all three counts match.

## Common mistakes
Do not discard single-character runs while checking pairs.
Reset both the difference and its first-position map after an invalid third character.
For three letters, track two independent differences rather than only one.

## Language notes
Python uses tuple keys for the three-letter prefix state.
Java uses integer keys for pairs and compact string keys for the two three-letter differences.
