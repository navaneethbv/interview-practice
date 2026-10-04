## Intuition

If a substring of length L repeats, its shorter prefixes repeat too.
This monotone feasibility condition supports binary search on length, while each fixed-length check records the earliest occurrence of every substring.

## Brute force

Comparing every pair of starting positions and extending their common prefix can take cubic time.
Binary search reduces the number of candidate lengths, although this reference still copies full substring keys.

## Approach

Search lengths from one through n - 1.
For a candidate length, `_repeat` scans every window and stores its first index in seen.
A repeated key updates `best_start` using that original index.
A successful check raises the lower bound; a failed check lowers the upper bound.
Keep the successful substring as best.
Scanning all windows rather than returning at the first duplicate ensures the earliest-first-occurrence tie rule.

## Walkthrough

```text
Input: s = "murmur"
Output: "mur"
```

For Example 1, length 3 finds `mur` at indices 0 and 3 and succeeds.
Trying length 4 finds `murm`, `urmu`, and `rmur`, none repeated.
The binary search cannot find a longer feasible length, so it returns `mur`.
Its first occurrence starts at zero.

## Complexity

A length-L check copies and hashes O(n) windows of length L, costing O(nL) expected time and up to O(nL) stored character space.
A conservative whole-method bound is O(n squared log n) time and O(n squared) peak space.
This implementation is therefore not a rolling-hash or suffix-array solution for large inputs.

## Edge cases

Empty and singleton strings return empty output.
Overlapping occurrences count, so `aaaa` can return `aaa`.
Equal-length repeated alternatives require the earliest first index.

## Common mistakes

Do not forbid overlapping windows.
Do not overwrite a substring's first occurrence with later indices.

## Language notes

Python slicing and Java substring create window strings in these references.
Dictionary or HashMap lookup does not remove the cost of constructing and hashing those strings.
