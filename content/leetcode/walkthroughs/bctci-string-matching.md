## Intuition

The first occurrence must begin at one of the positions where the entire target still fits in the source.
Try those positions in increasing order and compare corresponding characters until a mismatch or a complete match.
The first complete match is automatically the smallest valid index.

## Brute force

The displayed references implement the straightforward alignment-by-alignment search.
It is easy to verify, but unlike a prefix-function or failure-link matcher, it does not reuse partial-match information between neighboring starts.

## Approach

Loop over starts from zero through `len(s) - len(t)`, inclusive.
For a chosen start, compare source character `s[start + offset]` with target character `t[offset]`.
Stop checking that alignment as soon as any pair differs.
If all target positions match, return start immediately.
After exhausting all possible starts, return -1.
When the target is empty, the first alignment requires zero comparisons and therefore succeeds at index zero.
When the target is longer than the source, no alignment is possible and the outer loop has no iterations.

## Walkthrough

Example 1 searches for `world` inside `hello world`.
Starts zero through five fail at the first character because none begins with w.
At start six, the comparisons match w, o, r, l, and d in sequence.
Every target character matches, so the method returns 6.
Later starts do not need to be examined because the required first occurrence has already been found.

## Complexity

For source length n and nonempty target length m at most n, worst-case time is O((n - m + 1) times m).
Long repeated prefixes can cause nearly m comparisons at every alignment.
Both references use O(1) auxiliary space and create no source slices.

## Edge cases

An empty target returns zero even for empty source input.
An absent target returns -1; repeated occurrences still return only the earliest index.

## Common mistakes

Include the final possible start, where the target ends exactly at the source boundary.
Do not claim linear worst-case time for this direct comparison implementation.

## Language notes

Python's `all` short-circuits a generator on the first mismatch.
Java uses an explicit offset loop, comparing ASCII character units directly.
