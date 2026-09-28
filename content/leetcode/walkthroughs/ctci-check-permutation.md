## Intuition

Two strings are permutations when their character frequency maps are identical.
Length is a cheap early check, and decrementing one map while scanning the second string avoids sorting either input.

## Approach

1. If the lengths differ, return `false`.
2. Count every character in `first`.
3. Scan `second` and decrement the corresponding count.
4. Reject a character that was not counted or has already been used too many times.
5. Return `true` after the second scan.

## Walkthrough

For `first = "earth"`, the map contains one each of `e`, `a`, `r`, `t`, and `h`.
Scanning `second = "heart"` decrements those same five entries to zero, so the strings are permutations.

For `first = "apple"` and `second = "pearl"`, the first four useful characters can be matched, but `r` is absent from the map.
The method returns false without needing to compare sorted copies.

## Complexity

- Time: O(n + m), where `n` and `m` are the two string lengths.
- Space: O(u), where `u` is the number of distinct characters in the first string.

## Edge cases

Two empty strings are permutations.
Different lengths always produce false.
Spaces, punctuation, Unicode characters, and letter case are all significant.

## Common mistakes

- Comparing sets ignores repeated characters.
- Lowercasing or removing spaces changes the stated contract.
- Forgetting the early length check allows unnecessary work and can hide unmatched counts.

## Language notes

Python uses a dictionary with `get` for frequency updates.
Java uses `HashMap<Integer, Integer>` keyed by Unicode code point and rejects missing or exhausted entries while scanning the second string.
