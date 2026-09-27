## Intuition

Searching independently for every word repeats exploration of shared prefixes.
A trie lets one board traversal follow all dictionary words compatible with its current path.
When a prefix is absent from the trie, every word extending that board path can be rejected immediately.

## Brute force

Run a separate backtracking word search for every dictionary entry.
With W words, R × C cells, and maximum word length L, this can multiply the board-search cost by W.
A shared trie removes repeated prefix work and supports pruning already exhausted branches.

## Approach

1. Build a trie and store each full word at its terminal node.
2. Start `visit` (`_visit` in Python) from every board cell.
3. Stop if the cell's letter has no child under the current trie position.
4. If the reached node stores a word, append it and clear that terminal marker to avoid duplicate outputs.
5. Temporarily replace the board cell with `#`, explore its four neighbors, then restore the original character.
6. Remove a trie branch once it contains neither an unfound word nor children.

The marker prevents a cell from being reused within one path, while restoration allows later paths to use it.
Clearing a found word does not remove longer words sharing the same prefix.

## Walkthrough

Example 1 uses board `[["a", "b"], ["c", "d"]]` and words `["ab", "ac", "ad", "abd"]`.

| Path explored from top-left a | Result |
| --- | --- |
| a down to c | Find `ac` |
| a right to b | Find `ab` |
| a right to b, then down to d | Find `abd` |
| a directly to d | Impossible because diagonal moves are forbidden |

These references discover `ac`, `ab`, and `abd` in that order.
This is the same accepted set as the statement's output; result order is unrestricted.

## Complexity

Let D be the total dictionary character count.

- Time: O(D + RC × 3^L) as a worst-case bound, with trie and exhausted-branch pruning often reducing exploration.
- Space: O(D + L) auxiliary storage for the trie and path recursion, plus output references to found words.

## Edge cases

A word may be found along several paths but is emitted once.
A word that is a prefix of another can be emitted without stopping deeper exploration.
The board is restored after every visited path.
Words longer than any available simple path are never completed.

## Common mistakes

- Stopping after a terminal node misses longer words sharing its prefix.
- Removing an entire branch immediately after finding one word can do the same.
- Forgetting to restore a marked cell prevents valid later searches.

## Language notes

Python uses nested dictionaries and a `$` terminal key; Java uses private trie nodes with child maps and a nullable `word` field.
The board alphabet excludes `#`, so that temporary marker cannot match a stored letter.
Recursion depth is bounded by the maximum word length of ten.
