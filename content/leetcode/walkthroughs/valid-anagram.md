## Intuition

Rearrangement changes positions but preserves how many times each character appears.
Two strings are anagrams exactly when those frequency counts match for every letter.
The fixed lowercase alphabet lets Java store the entire frequency difference in a small array.

## Brute force

For each character in one string, search for and remove a matching unused character in the other.
Repeated searching and removal can take O(n²) time.
Sorting both strings is simpler but still costs O(n log n), while counting is linear.

## Approach

1. Use the frequency-count pattern.
2. In Python, build `Counter(s)` and `Counter(t)` and compare them directly.
3. In Java, reject unequal lengths, then increment a letter's count for each source character and decrement for each target character.
4. Return true only if every Java difference count is zero.

Equal length alone is insufficient, since the distribution of letters may differ.
Matching frequencies are sufficient because each occurrence in one string can then be paired with an occurrence of the same letter in the other, regardless of position.

## Walkthrough

Example 1 uses `s = "silent"` and `t = "listen"`.

| Letter | Count in `silent` | Count in `listen` | Difference |
| --- | --- | --- | --- |
| e | 1 | 1 | 0 |
| i | 1 | 1 | 0 |
| l | 1 | 1 | 0 |
| n | 1 | 1 | 0 |
| s | 1 | 1 | 0 |
| t | 1 | 1 | 0 |

All other lowercase letters have count zero in both strings.
Every difference is zero, so return true.
The positions of these letters do not need to match.

## Complexity

- Time: O(length(s) + length(t)), reading each character once and checking at most 26 counts.
- Space: O(1) under the fixed 26-letter input alphabet.

## Edge cases

Repeated letters must match in multiplicity, so `aab` and `abb` are not anagrams.
Different lengths immediately fail in Java and produce unequal counters in Python.
Identical strings are valid anagrams of themselves.
The references also handle two empty strings, although the statement requires nonempty inputs.

## Common mistakes

- Comparing sets ignores repeated occurrences.
- Comparing sorted distinct letters has the same multiplicity defect.
- Requiring the same character at each position tests equality instead of anagrams.

## Language notes

Python's `Counter` provides a concise mapping comparison.
Java's `int[26]` uses offsets from `'a'` and requires no map allocation.
The array approach assumes lowercase English letters exactly as specified; a broader character contract would need a different indexing strategy.
