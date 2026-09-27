## Intuition

Two strings are permutations exactly when each letter occurs equally often in both.
Every candidate substring therefore has the fixed length of `s1`.
Maintain letter counts as that window moves across `s2`, rather than rearranging characters.

## Brute force

For each length-m substring of a length-n `s2`, sort it and compare with sorted `s1`.
Repeated window sorting costs O(nm log m) time in the worst case.
Updating counts only for the incoming and outgoing letters avoids rebuilding each window.

## Approach

1. Use a fixed-size sliding window and build `wanted`, the counts of `s1`.
2. Start `window` empty and scan `s2` by `index`.
3. Increment the incoming character's count.
4. Once the prefix exceeds the target length, decrement the character at `index - len(s1)`.
5. Compare `window` with `wanted` after each update and return true if they match.
6. Return false if the scan ends without a match.

Before the window reaches the target length, its total count is too small to equal `wanted`, so those comparisons cannot create a false positive.
Afterward, each update preserves exactly the most recent m characters.
Counts retain multiplicities, which distinguishes `aab` from `abb`.

## Walkthrough

Example 1 uses `s1 = "abc"` and `s2 = "zzcabx"`.

| `index` | Window text | Nonzero counts | Match? |
| --- | --- | --- | --- |
| 0 | `z` | z:1 | No |
| 1 | `zz` | z:2 | No |
| 2 | `zzc` | z:2, c:1 | No |
| 3 | `zca` | z:1, c:1, a:1 | No |
| 4 | `cab` | c:1, a:1, b:1 | Yes |

The method returns true at index 4 without processing the final x.

## Complexity

- Time: O(m + n), because comparing at most 26 lowercase-letter counts is constant work per position.
- Space: Python uses O(1) auxiliary count storage for this fixed alphabet; Java additionally creates an O(m) character array through `s1.toCharArray()`.

## Edge cases

If `s1` is longer than `s2`, the count totals never match and the result is false.
Repeated letters require matching counts, not merely membership.
A one-letter pattern reduces to finding that letter anywhere in `s2`.
Both input strings are nonempty by contract.

## Common mistakes

- Using a set loses duplicate multiplicities.
- Removing the outgoing letter one step too early makes the window too short.
- Sorting or allocating each full window loses the intended linear scan.

## Language notes

Python uses `Counter` and deletes zero-count entries as characters leave.
Java indexes 26-element arrays using `character - 'a'` and compares them with `Arrays.equals`.
The constant-size comparison relies on the lowercase-English alphabet constraint.
