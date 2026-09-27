## Intuition

The needle may contain a prefix that is also a suffix, so a mismatch does not always require restarting from the next haystack character.
KMP records the longest proper prefix that is also a suffix for every needle prefix.
That table tells the scan how far to fall back while preserving work already matched.

## Brute force

A naive scan tries every candidate start and compares the complete needle there.
It may compare the same needle prefix at many neighboring starts, giving O(hn) worst-case time for haystack length h and needle length n.
KMP pays O(n) space for the prefix table to reduce the search to linear time.

## Approach

1. Return zero immediately when needle is empty.
2. Build prefix lengths by falling back through earlier table entries after each mismatch.
3. Scan haystack while falling back in the same way when the next character disagrees.
4. Extend the current match when characters agree.
5. Return the start index when the match reaches the needle length, or -1 after the scan.

## Walkthrough

Example 1 searches for nana in bananana.
The needle prefix table is [0, 0, 1, 2], because na repeats at the end of the prefix.
The scan reads b and a as mismatches with an empty match, then matches n, a, n, and a starting at index 2.
The full match ends at index 5, so the method returns 2.

## Complexity

Let h be the haystack length and n be the needle length.
Building the prefix table takes O(n) time, and the KMP scan takes O(h) time because every fallback moves through previously recorded borders.
The total time is O(h plus n), and the prefix table uses O(n) auxiliary space.
The empty-needle check follows the standard contract before indexing the needle.

## Edge cases

An empty needle returns zero.
A needle longer than haystack has no candidate start and returns -1.
A match at index zero returns immediately.
Overlapping occurrences do not matter because the scan stops at the first valid start.

## Common mistakes

- Returning the final matching occurrence instead of stopping at the first one changes the contract.
- Comparing only the first character accepts partial matches.
- Restarting from the next candidate after every mismatch repeats comparisons that the prefix table can reuse.
- Forgetting the empty-needle rule can produce an incorrect result for an empty search.

## Language notes

Python stores prefix lengths in a list and uses enumerate for the haystack scan.
Java builds an int prefix array and uses charAt, so it does not allocate substring or character-array buffers.
Both implementations return the same zero-based index.
