## Intuition

A candidate must split into at least two dictionary words.
Once a prefix is known, the remaining suffix may itself be a dictionary word or another concatenation.
Checking candidates from longest to shortest lets the first successful decomposition satisfy the requested ranking immediately.

## Brute force

For each candidate, enumerate every cut pattern and test all pieces against the dictionary.
Different cut patterns repeatedly ask whether the same suffix can be built, causing exponential repeated search without memoization.

## Approach

Store dictionary words in `known` and sort candidates by decreasing length, then alphabetical order.
For a candidate, try every proper cut between its first and last characters.
Require the prefix to be known and accept the suffix if it is known or recursively buildable.
Cache suffix results to avoid repeated decomposition work.
The whole candidate is never accepted merely because it belongs to `known`; at least one proper cut is mandatory.
Return the first successful candidate, or the empty string.

## Walkthrough

Example 1 checks `dogwalker` before the shorter entries.
At cut position 3, its prefix is `dog` and suffix is `walker`.
Both appear in the dictionary, so this is a valid two-word construction.
The candidate is already the longest entry, making further checks unnecessary.
Return `dogwalker`; it need not split `walker` further into smaller pieces.

## Complexity

For W words of maximum length L, a conservative bound is O(WL cubed + WL log W) time including substring creation, hashing, and sorting comparisons.
There are O(WL) possible suffix states whose stored strings can occupy O(WL squared) characters.
Recursive depth is O(L).

## Edge cases

A word may reuse the same dictionary component multiple times.
Equal-length successful candidates are resolved alphabetically.
A word alone does not qualify as its own decomposition.

## Common mistakes

Accepting every candidate found in the dictionary makes the problem trivial and incorrect.
Caching whole-word membership as buildability would create the same error indirectly.

## Language notes

Python distinguishes whole-candidate calls from suffix calls in `splits`.
Java separates `splits` from cached `buildable` calls, preserving the same proper-split requirement.
