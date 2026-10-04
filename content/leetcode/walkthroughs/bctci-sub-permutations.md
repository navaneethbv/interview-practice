## Intuition

A substring rearranges all letters of `s1` exactly when it has the same length and the same 26 letter counts.
A set of matching substring strings then removes repeated occurrences of the same arrangement.

## Brute force

Generating all permutations is factorial in the pattern length and duplicates work for repeated letters.
Sorting every candidate substring also repeats character processing.
The reference maintains counts in a sliding window of the required width.

## Approach

Fill `need` from `s1` and maintain `window` while scanning `s2`.
Add the entering letter and remove the letter leaving once the window exceeds `width`.
When a full window equals `need`, insert its exact substring into `found`.
Return the set size.

## Walkthrough

Example 1 scans width two windows `ab`, `ba`, `ab`, `bb`, and `ba` in `ababba`.
All except `bb` have one a and one b.
The set retains only the distinct strings `ab` and `ba`, so the answer is 2.

## Complexity

Let n be text length, m pattern length, and a the number of matching windows.
Frequency comparisons cost O(26n), while substring copying and hashing add expected O(am).
With d distinct matches, stored strings require O(dm) space, plus constant sized count arrays.

## Edge cases

Repeated appearances of one arrangement count once.
Repeated letters in `s1` are handled through multiplicities in `need`.
A one letter pattern can produce at most one distinct matching string.
Only windows of exactly the pattern length qualify.

## Common mistakes

Do not count matching positions instead of distinct matching strings.
A set of sorted signatures would merge all permutations into one key, losing the required distinction.
Do not claim unconditional linear time without accounting for copied matching substrings.

## Language notes

Python compares integer lists and stores slices in a set.
Java uses `Arrays.equals` and a `HashSet<String>` of substrings.
Both use 26 buckets because the contract restricts letters to lowercase English, allowing direct character offset indexing.
