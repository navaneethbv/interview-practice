## Intuition

Breadth-first search removes parentheses one deletion level at a time.
The first level containing a valid string therefore uses the minimum possible deletions.
A set removes duplicate strings created by deleting equal parentheses at different positions.
Letters are never deleted, so every candidate preserves their order.

## Brute force

A brute-force method could enumerate every subset of parentheses to remove and validate each result.
With p parentheses, that creates O(2^p) subsets and repeats work across deletion counts.
Breadth-first search still has exponential worst-case behavior, but it stops as soon as the minimum valid level is found.

## Approach

1. Start current_level with the original string.
2. For every string in that level, run a balance check that rejects a prefix with more closing parentheses and accepts only final balance zero.
3. If any valid results exist, return them.
4. Otherwise remove one parenthesis at every possible position to create next_level, then continue.
5. The helper keeps letters in each candidate and the set deduplicates identical results.

## Walkthrough

For Example 1, the first level contains ()())().
It is invalid because the fifth character creates a negative balance.
The next level removes one parenthesis and contains valid strings (())() and ()()().
The search returns both, proving one deletion is minimal.
For Example 2, )( is invalid at the first level.
Removing either parenthesis leaves an unmatched parenthesis, while removing both reaches the valid empty string.

## Complexity

Let n be the input length and p the number of parentheses.
There can be O(2^p) distinct candidate strings in the worst case.
Each level can try O(n) deletion positions and each deletion copies O(n) characters, so total time is O(n² * 2^p), including validation and Python's final output sort within this bound.
The set and returned results use O(n * 2^p) worst-case storage.

## Edge cases

A string containing only letters is already valid.
An unmatched opening or closing parenthesis can be removed.
An empty result is valid when all parentheses must be deleted.
Multiple deletion paths that produce the same text are returned once.

## Common mistakes

Do not return the first valid candidate from a deeper level after finding a shallower valid level.
Do not delete letters.
Do not omit the prefix balance check.
Do not return duplicate strings.

## Language notes

Python uses sets and list comprehensions for each breadth level.
Java uses HashSet for candidates and returns an ArrayList when a valid level is found.
The comparison mode is unordered, so the Java set iteration order is acceptable.
