## Intuition

An anagram window has exactly the same count for every letter as p.
Maintain counts for one sliding window of length len(p), adding the entering character and removing the leaving character.
Comparing the two fixed-size count arrays identifies every matching start.

## Brute force

Sorting every substring costs O(len(p) log len(p)) per window.
Recounting every window costs O(len(s) × len(p)).
A fixed alphabet allows constant-size count arrays and a linear scan.

## Approach

1. Count letters in p as target_counts.
2. Extend the window one character at a time.
3. When the window exceeds p's length, remove its leftmost character.
4. Compare window_counts with target_counts.
5. Record the window start when they match.

## Walkthrough

Example 1 uses s = "cbaebabacd" and p = "abc".
The first three-character window cba has counts one each and records index 0.
As the window slides, outgoing and incoming counts are updated.
The window bac at index 6 again matches target_counts, so index 6 is recorded.
The result is [0, 6].

## Complexity

- Time: O(len(p) + 26 × len(s)), counting the pattern once and comparing fixed-size arrays for each window; this is O(len(p) + len(s)) for the fixed alphabet.
- Space: O(26) auxiliary for the two frequency arrays, plus O(r) for r returned matching indices.

## Edge cases

If p is longer than s, no full window can match and the result is empty.
Repeated letters require counts, not just membership.
Adjacent overlapping matches are recorded independently.
The lowercase constraint makes the 26-slot arrays sufficient.

## Common mistakes

- Comparing sets and ignoring multiplicity.
- Forgetting to remove the outgoing character after the first full window.
- Returning window end indices instead of starts.
- Sorting s or p, which loses window positions.

## Language notes

Python indexes counts with ord and compares two fixed lists.
Java uses char arithmetic and Arrays.equals for the same count comparison.
The output order is scan order, which also satisfies the unordered judge comparison.
