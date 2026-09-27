## Intuition

Split each word into a left prefix and right suffix.
If one side is already a palindrome, the reversed other side can complete a palindrome with a word in the lookup map.
Checking every split captures both orientations of a valid pair, including empty prefixes and suffixes.

## Brute force

Concatenating and checking every ordered pair takes O(W²L) time for W words of maximum length L, with repeated string work.
Splitting each word once and looking up reversed pieces avoids comparing pairs that cannot share a boundary.

## Approach

1. Map every word to its index in `word_index`.
2. For each word and split, form `left` and `right`.
3. If `left` is palindromic, look up `reverse(right)` and record the other index first.
4. If `right` is palindromic, look up `reverse(left)` and record the current index first.
5. Deduplicate pairs in `pairs`; Python sorts them before returning, while Java returns any valid order.

## Walkthrough

Example 1 uses `words = ["bat", "tab", "cat"]`.

| current word | split condition | reversed lookup | pair |
| --- | --- | --- | --- |
| `bat` | empty left is palindrome | `reverse("bat") = "tab"` at 1 | `[1,0]` |
| `tab` | empty left is palindrome | `reverse("tab") = "bat"` at 0 | `[0,1]` |
| `cat` | no matching reverse | none | none |

Python returns the sorted result `[[0,1], [1,0]]`; either ordering is accepted for Java.

## Complexity

- Time: O(sum(Li²) + P log P) in Python, because every split processes strings and P pairs are sorted at the end.
Java omits output sorting and takes O(sum(Li²) + P) expected time.
- Space: O(S + P), for S stored word characters and P deduplicated output pairs, plus slicing temporaries.

## Edge cases

An empty word creates pairs with every palindromic word in both directions.
A word never pairs with itself because `_record` rejects equal indices.
Distinct input words make the lookup index unambiguous.
Words with no compatible reverse add no pair.

## Common mistakes

- Checking only whole-word reverses misses palindromic prefixes and suffixes.
- Reversing the pair orientation produces a valid concatenation in the wrong order.
- Omitting deduplication can add the same pair through multiple split cases.

## Language notes

Python creates prefix and suffix slices and reverses them with `[::-1]`.
Java uses `substring`, `StringBuilder.reverse`, and `isPalindrome` helpers, so string-copy costs are also part of the bound.
Python sorts its set of pairs for deterministic output.
Java copies a `HashSet` into its returned list, whose order is unspecified and accepted by the judge.
