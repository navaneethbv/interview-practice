## Intuition

A valid window must cover every required occurrence, not merely every distinct target character.
Track remaining deficits in `need` and their total in `missing`.
Expand until all deficits are covered, then shrink from the left as far as validity allows.

## Brute force

Enumerate substrings and check their character counts against the target.
Even with incremental counting this can require O(n²) candidate windows.
Sliding boundaries reuse the counts and evaluate each boundary movement once.

## Approach

1. Initialize `need` from target frequencies and `missing` to the target length.
2. For each rightmost character, reduce `missing` if its current deficit is positive, then decrement its `need` count.
3. While `missing == 0`, record the current window if it is shorter than the best.
4. Restore the outgoing left character's count and increase `missing` if that count becomes positive.
5. Advance `left` and continue shrinking until a required occurrence is lost.
6. Return the best stored substring, or an empty string if no valid window was found.

Negative `need` counts represent surplus occurrences, including characters absent from the target.
Removing surplus characters leaves the window valid; removing a newly needed occurrence ends the shrinking phase.

## Walkthrough

Example 1 uses `s = "xAByCz"` and `t = "ABC"`.

| Event | `missing` | Best window so far |
| --- | --- | --- |
| Read x | 3 | None |
| Read A | 2 | None |
| Read B, then y | 1 | None |
| Read C | 0 | `xAByC` |
| Remove surplus x | 0 | `AByC` |
| Remove required A | 1 | `AByC` |
| Read z | 1 | `AByC` |

Return `AByC`, covering the three required letters in four positions.

## Complexity

- Time: O(length(s) + length(t)), because each boundary moves only forward.
- Space: O(1) count storage for the fixed English-letter alphabet, plus space for the returned substring.

## Edge cases

Repeated target letters require repeated occurrences in the window.
If the source lacks any required occurrence, the best window remains absent.
Uppercase and lowercase letters are counted separately.
Both strings are nonempty under the stated contract.

## Common mistakes

- Counting only distinct target letters mishandles multiplicities.
- Shrinking before recording a valid window can lose the optimum.
- Treating negative deficits as missing characters reverses their meaning.

## Language notes

Python uses `Counter` and stores best endpoints as a half-open pair.
Java uses an ASCII-sized count array and stores `bestStart` with `bestLength`, which is safe for the stated English letters.
Both delay substring creation until the final return instead of copying every candidate window.
