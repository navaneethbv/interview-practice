## Intuition

When a character repeats inside the current substring, every valid continuation must start after its previous occurrence.
Remember the most recent index of each character in `last`.
This lets the left boundary jump directly to the first possible valid position without removing characters individually.

## Brute force

For every start position, expand until a repeat is found using a set.
That takes O(n²) time in the worst case.
A shared sliding window reuses the work as the right endpoint advances.

## Approach

1. Initialize `last` empty and `left = best = 0`.
2. Scan characters with their `right` index.
3. Update `left` to the larger of its current value and one past the character's last recorded position.
4. Store the current index in `last`.
5. Update `best` with `right - left + 1`.
6. Return `best`.

The maximum in the boundary update prevents a repeat outside the current window from moving `left` backward.
After the update, the window contains no duplicate character, and it is the longest valid window ending at this `right` position.

## Walkthrough

Example 1 uses `s = "abcaef"`.

| `right` | Character | New `left` | Current window | `best` |
| --- | --- | --- | --- | --- |
| 0 | a | 0 | `a` | 1 |
| 1 | b | 0 | `ab` | 2 |
| 2 | c | 0 | `abc` | 3 |
| 3 | a | 1 | `bca` | 3 |
| 4 | e | 1 | `bcae` | 4 |
| 5 | f | 1 | `bcaef` | 5 |

The repeated a excludes only its earlier occurrence and everything before it.
Return 5.

## Complexity

- Time: O(n) expected, with average constant-time map lookups and updates per character.
- Space: O(min(n, Σ)), where Σ is the number of distinct possible input characters.

## Edge cases

An empty string returns zero.
Identical characters keep the window length at one.
Spaces, digits, and punctuation participate in duplicate checks just like letters.
A repeated character before the current `left` does not shrink the current valid window.

## Common mistakes

- Setting `left` directly from the last occurrence can move it backward.
- Tracking only a set does not support the direct index jump used here.
- Counting a subsequence instead of a contiguous window solves a different problem.

## Language notes

Python uses a dictionary and `enumerate`; Java uses `HashMap<Character, Integer>` and `charAt`.
Both interpret the stated English-character inputs consistently.
For an expanded contract including supplementary Unicode characters, Java would need code-point indexing to match Python's character iteration.
