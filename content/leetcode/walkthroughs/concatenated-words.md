## Intuition

A word is concatenated when it can be split into at least two dictionary words.
Dynamic programming records whether each prefix can be formed, while the condition `start > 0 or end < len(word)` prevents accepting the word itself as its only piece.

## Brute force

Trying every split recursively can revisit the same prefix exponentially.
Memoizing prefix reachability turns each endpoint into one reusable state.

## Approach

1. Put all words in a set for constant-average dictionary lookup.
2. For each word, set `possible[0]` true and examine every end position.
3. Mark an end reachable when a reachable start and dictionary slice form a valid piece, excluding the complete word alone.
4. Add the word if its final endpoint is reachable.

## Walkthrough

For Example 1, `cat` and `dog` are dictionary entries, as is `catdog`.
While processing `catdog`, the prefix ending at 3 becomes reachable from `cat`.
The suffix `dog` then marks endpoint 6, so `catdog` is appended.
The two single words cannot use themselves as their only piece and are skipped.

## Complexity

Let W be the number of words and L the maximum word length.
The nested endpoint and start loops examine O(WL^2) split positions, but Python slicing and Java `substring` copy or hash up to O(L) characters, giving O(WL^3) worst-case character work.
The set stores O(total input characters), and each word's DP array uses O(L) space.

## Edge cases

An empty word is not present under the local contract.
A word repeated in the dictionary still must use two pieces, not one occurrence of itself.
Words can be concatenations of more than two shorter entries.

## Common mistakes

Do not mark the final endpoint from the whole word itself.
Do not reuse a previous word's DP array.
Check `possible[start]` before doing the dictionary lookup.

## Language notes

Python's `word[start:end]` creates a new string for each attempted slice.
Java's substring also represents a copied range on current Java runtimes.
