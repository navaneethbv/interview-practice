## Intuition

The longest happy prefix is both a proper prefix and suffix.
The KMP prefix table stores the longest border for every ending position and lets mismatches fall back to shorter known borders instead of restarting.

## Brute force

Testing every prefix against the corresponding suffix can take O(n²) character comparisons and creates candidate slices.
KMP computes all fallback lengths in linear time.

## Approach

1. Maintain `prefix_length[i]`, the longest proper prefix ending at i that is also a suffix.
2. Start each position with the previous border length.
3. Follow fallback links while the next characters differ.
4. Extend on a match and return the prefix with the final table length.

## Walkthrough

For Example 1, `level` starts with `l` and ends with `l`, so a border of length 1 is possible.
The middle characters do not extend that border to length 2 or more.
The final table entry is 1, and slicing the first character returns `l`.

## Complexity

KMP builds the table in O(n) time because each fallback moves to an earlier border.
The prefix array uses O(n) space.
The returned Python slice and Java `substring` copy O(k) characters for answer length k.

## Edge cases

A one-character string has no proper nonempty border.
Repeated letters can make the answer nearly the whole string.
The full string itself is excluded by the prefix-table definition.

## Common mistakes

Use `prefix_length[candidate - 1]` after a mismatch.
Do not compare the full string as its own prefix.
Return the border length from the last table entry, not the largest table entry anywhere.

## Language notes

Python indexes the string directly and returns a slice.
Java stores the same lengths in an `int[]` and returns `substring(0, finalLength)`.
