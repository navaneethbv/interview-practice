## Intuition
Every query asks about words ending at the newest character, so matching should proceed backward from that character.
A trie of reversed dictionary words shares common suffixes across possible matches.
Only the last L stream characters matter, where L is the longest dictionary word.

## Brute force
After each query, compare every dictionary word against the current stream ending.
With T total dictionary characters, these comparisons can take O(T) time per query.
Keeping the entire stream also consumes O(Q) history space after Q queries, even when old characters can no longer belong to a matching suffix.

## Approach
1. Insert each word backward into a trie and mark its final trie node as terminal.
2. Keep a deque limited to the maximum dictionary word length.
3. Append each queried letter and discard the oldest letter if the limit is exceeded.
4. Walk the retained stream backward through trie edges.
5. Return true upon reaching any terminal node, or false when the next edge is missing or the retained suffix is exhausted.

A terminal node means the letters just traversed, reversed back into reading order, form a complete dictionary word.
A missing edge rules out every longer candidate along that suffix.
Returning a match must not clear the retained stream because later queries still depend on earlier letters.

## Walkthrough
Example 1 uses dictionary `[ab,bc]`.
Insertion creates reversed paths `b -> a` and `c -> b`.
Query `a` retains `[a]`; the root has no a edge, so it returns false.
Query `b` retains `[a,b]`; walking b then a reaches the terminal node for ab and returns true.
Query `c` first discards a because L is two, retaining `[b,c]`.
Walking c then b matches bc, producing true again.

## Complexity
Construction takes O(T) time and O(T) trie space for the fixed lowercase alphabet, with expected constant-time dictionary operations in Python.
Each query takes O(L) worst-case traversal time and constant-amortized deque maintenance.
The retained history uses O(L) space, so total persistent storage is O(T+L).
Java's child arrays have a fixed twenty-six entries per trie node.

## Edge cases
A one-letter word can match immediately at the first traversed edge.
Duplicate dictionary words reuse the same terminal path.
A word that is a suffix of another word can trigger an early successful return.

## Common mistakes
- Inserting ordinary forward words conflicts with backward stream traversal.
- Clearing history after a match loses overlapping matches.
- Retaining unlimited history adds storage unrelated to any possible word length.

## Language notes
Python uses nested dictionaries and a bounded deque with `maxlen`.
Java uses a private `TrieNode`, an `ArrayDeque`, and a descending iterator.
Both constructors and queries avoid recursion.
