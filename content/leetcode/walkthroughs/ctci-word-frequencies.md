## Intuition

Repeated queries against one book should reuse a frequency table instead of recounting its words.
Normalize case while building that table and while querying it, so differently capitalized versions share the same entry.
The structure stores counts, not the original word order.

## Brute force

For every query, scan the complete book and count case-insensitive matches.
For q queries and n words, this requires O(qn) word comparisons, plus the cost of normalizing or comparing characters.

## Approach

The constructor lowercases each book word and increments its entry in `counts`.
`getFrequency` lowercases the requested word and returns that entry, using zero when no entry exists.
After preprocessing, the stored count for a normalized word equals the number of book positions containing that word regardless of case.
Each query is independent and does not consume occurrences or change the book's counts.

## Walkthrough

Example 1 contains `The`, `cat`, `saw`, `the`, and `dog`.
Normalization merges the first and fourth words under `the`, giving count two.
The remaining three normalized words each have count one.
Querying `the` returns 2.
Querying `DOG` normalizes to `dog` and returns 1.
Querying `bird` finds no stored entry and returns 0.
The output is `[2, 1, 0]`.

## Complexity

Let C be the total characters in the book and U its distinct normalized words.
Preprocessing takes expected O(C) time with hashing.
A query of length L takes expected O(L) time including lowercase conversion and hashing.
Stored keys and counts require space proportional to the total characters across distinct normalized words.

## Edge cases

An empty book returns zero for every query.
Repeated queries return the same count.
Words differing only in capitalization deliberately merge.

## Common mistakes

Normalizing only the constructor or only the query produces inconsistent lookups.
Do not remove words from the table after querying them; this is a frequency lookup, not a matching-consumption task.

## Language notes

Python's `Counter` returns zero for missing keys.
Java uses `getOrDefault` and `Locale.ROOT` for stable lowercase normalization rather than depending on the machine's default locale.
