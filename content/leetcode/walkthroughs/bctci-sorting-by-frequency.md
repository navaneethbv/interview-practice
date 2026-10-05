## Intuition

The output contains distinct letters, so first compress the word into letter counts.
Then order those letters primarily by descending count and secondarily by alphabetical order, independent of where they first appeared.

## Brute force

Sorting every character in the word would retain duplicates and do unnecessary work.
Repeatedly counting each candidate letter also scans the input many times.
A single counting pass provides the complete information needed for ordering.

## Approach

Python builds `counts` with `Counter` and sorts its keys by `(-counts[letter], letter)`.
Java fills 26 counters, collects present letters alphabetically, then applies a stable descending frequency sort.
Each letter enters the result exactly once.

## Walkthrough

Example 1's word `aabbbcccc` produces counts a = 2, b = 3, and c = 4.
Descending frequency therefore selects c first, b second, and a last.
The returned list is `["c", "b", "a"]`, with no repeated copies despite the original multiplicities.

## Complexity

For n characters and d distinct letters, counting plus sorting takes O(n + d log d).
Here d is at most 26, so overall time is O(n).
Python uses O(d) extra storage; Java's `toCharArray()` creates an additional O(n) temporary array.

## Edge cases

An empty word yields an empty list.
A repeated single letter appears once in the answer.
When frequencies tie, alphabetical order decides the result.
The lowercase English constraint ensures there are at most 26 possible keys.

## Common mistakes

Do not output letters repeated by their frequencies.
Do not use first occurrence order as the tie break.
A descending comparator alone needs stable sorting of an already alphabetic list, as in Java, or an explicit alphabetic secondary key.

## Language notes

Python encodes both comparison criteria directly in a tuple.
Java relies on the stability of `List.sort` after constructing letters from a through z.
Its comparator subtracts bounded counts, which is safe because the word has at most 100,000 characters.
