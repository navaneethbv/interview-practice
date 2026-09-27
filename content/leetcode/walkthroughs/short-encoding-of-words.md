## Intuition
A word that is a suffix of another word does not need its own `#` entry.
Keep only words that are not a suffix of any retained longer word, then sum each remaining length plus its separator.

## Brute force
A naive solution checks every ordered pair of words and tests suffix membership.
For W words of average length L, that costs O(W^2 L) time.
The set lets each generated suffix remove a redundant word directly.

## Approach
1. Put all distinct words in a set.
2. For each word, remove every proper suffix from the set.
3. Sum `len(word) + 1` for the words that remain.

## Walkthrough
Example 1 contains `time`, `me`, and `bell`.
The suffix `ime` and `me` are considered for `time`, so `me` is removed because it is already represented inside `time#`.
No longer word removes `bell`.
The remaining words are `time` and `bell`.
Their encoded lengths are 5 and 5, giving the result 10.

## Complexity
For W words with maximum length L, generating and hashing suffixes costs O(W L^2) character work in Python because slices copy characters.
Java `substring` also creates suffix strings, so the same bound is a safe description.
The set stores O(WL) characters in the worst case, and the returned length is O(1) space.

## Edge cases
Duplicate words contribute once because the set deduplicates them.
A one-character word has no proper suffix to remove.
A word that is a suffix of several words is still counted at most once if it remains.

## Common mistakes
Removing prefixes instead of suffixes changes the encoding rule.
Forgetting the separator adds one too few characters per retained word.
Counting duplicate input entries separately overstates the minimum length.

## Language notes
Python slicing creates each suffix string explicitly.
Java uses `substring` and a `HashSet<String>` with the same suffix semantics.
