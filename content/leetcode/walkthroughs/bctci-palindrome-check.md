## Intuition

A palindrome pairs its first letter with its last, its second with its second last, and so forth.
Checking those mirrored pairs directly proves whether reading in either direction yields the same string.

## Brute force

Reversing the string and comparing it with the original is straightforward but allocates a second string.
Two indices perform the same logical comparisons without constructing a reversed copy or changing the original input.

## Approach

Set `left` to zero and `right` to the final index.
While `left < right`, compare those two letters and return false on a mismatch.
Otherwise move both indices inward.
If all required pairs match, return true.

## Walkthrough

For Example 1, `level` first compares l at indices 0 and 4.
They match, so the next comparison checks e at indices 1 and 3.
Those also match.
The pointers meet on v, which requires no comparison with another position, and the result is true.

## Complexity

At most floor(n/2) pairs are compared, giving O(n) worst case time for a string of length n.
A mismatch can terminate sooner.
The two indices occupy O(1) auxiliary space, and the result is one Boolean.

## Edge cases

The empty string returns true because it has no mismatched mirrored pairs.
A one letter string also returns true.
Even lengths stop after the middle pair, whereas odd lengths leave a single middle letter that always matches itself.

## Common mistakes

Do not remove letters or perform case normalization because the given alphabet is already lowercase English.
Stop on the first mismatch rather than allowing later matches to overwrite failure.
The loop condition avoids comparing the same middle letter unnecessarily.

## Language notes

Python indexes characters and updates pointers in separate statements.
Java compares `charAt(left++)` and `charAt(right--)`, advancing after reading each character.
For the specified English alphabet, both representations compare the same individual letters and preserve the original string.
