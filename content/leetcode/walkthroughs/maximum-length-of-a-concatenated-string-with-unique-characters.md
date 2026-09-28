## Intuition
Only the set of letters used by a valid concatenation matters when considering another word.
A twenty-six-bit mask records that set compactly.
Two valid masks can combine exactly when their bitwise intersection is zero.

## Brute force
Enumerate all 2^n subsequences, concatenate their words, and check whether the resulting characters repeat.
For n words and T total input characters, a direct implementation can take O(T*2^n) time from repeated string construction and validation.
Mask states reuse already validated letter sets and avoid constructing concatenations.

## Approach
1. Begin with `masks = {0}`, representing the empty subsequence.
2. Convert each word into a bitmask, returning a sentinel if a letter repeats inside that word.
3. Skip invalid words because no concatenation containing one could have unique letters.
4. For each existing mask disjoint from the word mask, create their bitwise union in a separate additions set.
5. Merge additions into the reachable masks, then return the largest population count.

Processing words in input order ensures every state represents a subsequence.
Different choices with the same mask have identical future compatibility and length, so the set can safely merge them.
The separate additions collection prevents newly created states from being revisited during the same iteration.

## Walkthrough
Example 1 is `[ab,cd,aa]`.
Initially only the empty mask is reachable.
After ab, the reachable letter sets are empty and `{a,b}`.
After cd, the algorithm also reaches `{c,d}` and `{a,b,c,d}` because the two words have no overlapping bit.
The word aa is rejected while building its mask: its second a repeats an already set bit.
The largest remaining population count is four, so the answer is 4.

## Complexity
Reading words costs O(T), and each of n rounds can examine up to 2^n masks.
Expected time is O(T+n*2^n), using constant-size masks and expected constant-time set operations.
Reachable masks and temporary additions occupy O(2^n) auxiliary space.
The lowercase alphabet bounds every mask to twenty-six bits and every answer to at most 26.

## Edge cases
If every word contains an internal duplicate, only the empty mask remains and the result is zero.
Two individually valid words may still overlap and therefore cannot both be selected.
Repeated identical words do not force repeated characters because selecting a subsequence is optional.

## Common mistakes
- Using bitwise OR without first testing intersection hides duplicate letters.
- Rejecting only duplicates between words misses repeats inside one word.
- Mutating the reachable set while iterating over it can invalidate iteration.

## Language notes
Python counts set bits with `int.bit_count`.
Java uses `Integer.bitCount` and `HashSet<Integer>`.
Both use -1 solely as the invalid-word sentinel; valid twenty-six-bit masks are nonnegative.
