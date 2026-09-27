## Intuition

Each palindromic substring has a unique center and radius.
Expanding around every character and every gap discovers each such substring exactly once.
Unlike the longest-palindrome problem, every successful expansion contributes one to the answer.

## Brute force

Test all O(n²) substrings independently for palindromic symmetry.
A linear check per substring gives O(n³) worst-case time.
Center expansion reuses the fact that an inner substring already matched.

## Approach

1. Initialize `total = 0`.
2. For every `center`, count expansions beginning at `(center, center)` and at `(center, center + 1)`.
3. While the two pointers are in bounds and their characters match, increment the local count and move both outward.
4. Add both local counts to `total`.
5. Return `total`.

An odd-length palindrome belongs to its middle character, while an even-length palindrome belongs to its middle gap.
Different radii at one center have different endpoints and count separately, even when their text is repetitive.
No set of substring strings should be used because it would merge distinct occurrences.

## Walkthrough

Example 1 uses `s = "abba"`.

| Center | Odd palindromes | Even palindromes |
| --- | --- | --- |
| Index 0 | `a` | None |
| Index 1 | `b` | `bb`, then `abba` |
| Index 2 | `b` | None |
| Index 3 | `a` | None |

There are four singleton occurrences and two longer palindromes.
The two separate b characters each count, as do the two separate a characters.
Return 6.

## Complexity

- Time: O(n²), since every center may expand across a linear portion of the string.
- Space: O(1), using counters and endpoint indices without constructing substrings.

## Edge cases

A singleton contributes one.
An all-equal string makes every substring palindromic, producing n(n + 1)/2 occurrences.
When all letters differ, only the singleton centers succeed.
The count fits Java `int` under the maximum length of 1,000.

## Common mistakes

- Deduplicating by substring text undercounts repeated occurrences.
- Counting only the final maximal expansion misses shorter palindromes at the same center.
- Ignoring gap centers misses even lengths.

## Language notes

Both versions use a small helper returning a count for one center.
Python names it `_count_from_center`, while Java uses `countFromCenter`.
The loops compare characters directly and avoid recursion, DP tables, and temporary substring copies.
