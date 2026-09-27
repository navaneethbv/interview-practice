## Intuition

The system keeps a frequency for each sentence and a current unfinished prefix.
Each input character extends that prefix and filters matching sentences.
Results rank by descending frequency and then lexicographic order, with only three returned.

## Brute force

A direct baseline can scan every stored sentence for each prefix and sort the matches.
The current reference follows that baseline, which is simple but costs more per input character than a trie.

## Approach

1. Initialize sentence counts from the constructor arrays.
2. On a normal character, append it to the current prefix.
3. Collect sentences that start with the prefix.
4. Sort matches by descending count and ascending sentence text.
5. Return the first three matches.
6. On #, increment the current sentence count, clear the prefix, and return an empty list.

## Walkthrough

Example 1 starts with cat count 3, car count 2, and cart count 2.
Input c produces all three sentences, ordered cat, car, cart by frequency then text.
Input a keeps the same three matches and order.
Input # inserts the new sentence ca with count 1, clears the prefix, and returns an empty list.

## Complexity

Let P be the current prefix length, S the stored sentence count, L the maximum sentence length, and M the matching count.
One input costs O(P + S * min(P,L) + M log M * L) time for prefix copying, matching, and string-aware sorting.
The temporary prefix and match references use O(P + M) space.
Stored sentence text and counts use O(T + S) space where T is total stored text length.
The returned list contains at most three references to existing sentence strings.

## Edge cases

A prefix with no matches returns an empty list.
Equal frequencies use lexicographic order.
The # character stores the complete current prefix as a sentence.
A new sentence starts with count one when it was not previously stored.

## Common mistakes

- Returning matches in insertion order ignores the ranking rules.
- Forgetting to clear prefix after # contaminates the next query.
- Sorting ascending frequency returns the least popular sentences.
- Returning more than three matches violates the interface.

## Language notes

Python uses Counter and sorts a filtered list.
Java scans map keys and applies a comparator before limiting to three.
Both classes retain mutable state across input calls.
