## Intuition

Every palindrome has a center: either one character or the gap between two characters.
Starting at each possible center, expand while the two outer characters match.
The longest expansion among all centers must include a longest palindromic substring.

## Brute force

Enumerate every substring and test it by comparing mirrored characters.
This can take O(n³) time because there are quadratically many substrings and each check may be linear.
Center expansion shares the inner palindrome checks as each candidate grows.

## Approach

1. Track `start` and the best length, initially the first character.
2. For each `center`, expand from `(center, center)` for odd lengths and `(center, center + 1)` for even lengths.
3. The helper moves outward until a boundary or mismatch, then returns `right - left - 1`.
4. If the larger expansion improves the best length, compute its start as `center - (length - 1) // 2`.
5. Return the saved substring after every center is examined.

The helper stops one position beyond each end of the valid palindrome, explaining the subtraction in its length calculation.
The strict improvement check retains an earlier answer when lengths tie.

## Walkthrough

Example 1 uses `s = "cabbad"`.
At the gap after index 2, the even expansion proceeds as follows:

| `left`, `right` | Comparison | Valid substring |
| --- | --- | --- |
| 2, 3 | b = b | `bb` |
| 1, 4 | a = a | `abba` |
| 0, 5 | c differs from d | Stop |

The resulting length is four and the saved start is one.
No other center produces a longer result, so return `abba`.

## Complexity

- Time: O(n²), with O(n) possible centers and up to O(n) expansion work per center.
- Space: O(1) auxiliary state, plus O(n) worst-case storage for the returned substring copy.

## Edge cases

One character is already a palindrome.
Even-length answers require the gap-centered expansion.
If all characters differ, any singleton is accepted.
Character comparisons remain case sensitive.

## Common mistakes

- Checking only character centers misses even-length palindromes.
- Using the stopped pointers directly includes the mismatching outer characters.
- Sorting or skipping characters finds a subsequence rather than a substring.

## Language notes

Python uses floor division and slicing; Java uses integer division and `substring` with an exclusive end.
Both defer copying until the final return, avoiding repeated substring allocation during expansion.
The method assumes the nonempty string guaranteed by the statement.
