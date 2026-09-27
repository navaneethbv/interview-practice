## Intuition

A prefix is segmentable if some valid final word follows a prefix that is already segmentable.
Remember reachable prefix boundaries instead of committing greedily to a particular word.
The longest dictionary word bounds how far backward a possible final word can start.

## Brute force

Try every dictionary-matching prefix and recursively split the remaining suffix.
Ambiguous prefixes can cause exponentially many repeated explorations of the same suffix.
A boolean DP stores the answer for each prefix boundary once.

## Approach

1. Put the dictionary in the hash set `words` and compute its maximum word length `limit`.
2. Define `dp[end]` to mean that `s[:end]` can be segmented, with `dp[0] = true`.
3. For each `end`, examine starts from `max(0, end - limit)` through `end - 1`.
4. If `dp[start]` is true and the substring from `start` to `end` is in `words`, mark `dp[end]` true and stop checking that boundary.
5. Return the state for the full string.

The helper checks only nonempty candidate words, and each transition advances the boundary.
Reusing a word requires no special bookkeeping because the dictionary is never consumed.

## Walkthrough

Example 1 is `s = "rainbowrain"`, with `words = {"rain", "bow"}` and `limit = 4`.

| `end` | Prefix | Successful transition |
| --- | --- | --- |
| 0 | Empty | Base case |
| 4 | `rain` | Reachable 0 followed by `rain` |
| 7 | `rainbow` | Reachable 4 followed by `bow` |
| 11 | `rainbowrain` | Reachable 7 followed by `rain` |

All other prefix boundaries remain false.
The final boundary is reachable, so return true.

## Complexity

Let n be the string length, L the longest word length, c the word count, and D the total dictionary character count.

- Time: O(D + nL²) expected, including hashing the dictionary and copying/hashing up to L candidate substrings of length at most L per boundary.
- Space: O(n + c + L) auxiliary space, for the DP, set entries referencing existing words, and a temporary substring.

## Edge cases

A whole-string dictionary match succeeds from boundary zero.
Overlapping dictionary prefixes are all considered when necessary.
An unmatched final suffix returns false even if earlier prefixes are reachable.
The dictionary is nonempty under the input contract.

## Common mistakes

- Greedily taking the longest matching word can block a valid later split.
- Checking substring membership without `dp[start]` accepts unreachable prefixes.
- Claiming every substring test is constant time ignores substring creation and hashing.

## Language notes

Python slicing and Java `substring` both create the candidate substring used in lookup.
Both versions extract the boundary search into a helper that returns at the first successful split.
Hash sets avoid scanning the entire dictionary for each candidate, but do not eliminate the cost of constructing that candidate.
