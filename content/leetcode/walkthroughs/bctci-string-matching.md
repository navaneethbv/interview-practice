## Intuition

To find the first occurrence of `t`, try each possible starting index in `s` from left to right.
At a candidate start, compare the characters of `t` with the corresponding characters of `s`.
The first candidate whose complete comparison succeeds is necessarily the earliest match.

## Approach

Iterate `start` through every position where a string of length `t` could fit.
For each position, compare offsets from zero through `len(t) - 1` and reject the position on the first mismatch.
Return `start` as soon as all offsets match, and return `-1` after every candidate fails.
The range expression includes exactly one candidate when `t` is empty, so the required answer is zero.

## Walkthrough

For Example 1, the candidates in `"hello world"` begin at index zero.
The first several candidates fail when their characters disagree with the first character of `"world"`.
At index six, the characters `w`, `o`, `r`, `l`, and `d` all match, so the method returns six.
For Example 2, every candidate eventually mismatches `"not"`, so the loop finishes and returns `-1`.

## Complexity

Let `n` be the length of `s` and `m` the length of `t`.
There are at most `n - m + 1` candidates and each comparison can inspect `m` characters, giving `O(nm)` worst-case time.
The implementation uses `O(1)` auxiliary space.

## Edge cases

An empty `t` occurs at index zero even when `s` is also empty.
If `t` is longer than `s`, the candidate range is empty and the result is `-1`.
A match at index zero must be returned immediately rather than after scanning later positions.

## Common mistakes

Returning after a partial prefix match incorrectly accepts strings that differ later.
Starting at every index through the end of `s` can read beyond the candidate window.
Using a library search without checking the empty-pattern contract can hide a mismatch with the local specification.

## Language notes

Python uses `all` over the offset comparisons, while Java uses an explicit `while` loop and checks whether every offset matched.
Both implementations preserve left-to-right candidate order and use the parameter names `s` and `t` from the spec.
