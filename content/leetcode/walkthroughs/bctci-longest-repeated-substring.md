## Intuition

If a substring of length L repeats, its shorter prefixes repeat too.
This monotonic property allows binary search over lengths.
For a fixed length, matching substring values identify repetitions, and retaining the earliest start enforces the required tie rule.

## Brute force

Compare substrings at every pair of starting positions and extend matches character by character.
That can require O(n³) character comparisons.

## Approach

Binary search between lengths 1 and `len(s) - 1`.
The `_repeat` helper scans every window of the requested length, storing each distinct window's first start in `seen`.
On a repeated window, update `best_start` only if that first occurrence is earlier than the current candidate.
Return the chosen substring, or `None` when no repetition exists.
A successful length becomes `best` and moves the search upward; failure moves it downward.
Overlapping windows are deliberately included.

## Walkthrough

Example 1 is `murmur`, of length six.
The initial midpoint is length 3.
The helper sees `mur` first at index 0 and again at index 3, so it returns `mur`.
The search next tests length 4, whose windows `murm`, `urmu`, and `rmur` are distinct.
That failure ends the search with `best = "mur"`.

## Complexity

These references copy and hash complete substring windows rather than using a rolling hash.
A length-L test can cost O(nL) time and O(nL) stored characters.
Thus conservative worst-case bounds are O(n² log n) time and O(n²) peak space, despite the logarithmic number of length tests.

## Edge cases

Empty and one-character strings return the empty string.
Overlaps matter: `aaaa` contains `aaa` at starts 0 and 1.

## Common mistakes

Do not return the first duplicate encountered without checking earlier first-occurrence ties.
Do not describe the implementation as an O(n log n) rolling-hash algorithm.

## Language notes

Python distinguishes failure `None` from a found string.
Java uses null and `putIfAbsent`; both preserve the earliest start of each exact substring.
