## Intuition

After aligning the shorter string on the left, the first mismatch determines the only possible edit.
Equal lengths require a replacement, while a one-character length difference requires skipping the extra character in the longer string.

## Approach

1. Reject strings whose lengths differ by more than one.
2. Swap the inputs when necessary so `first` is no longer than `second`.
3. Scan both strings with two pointers.
4. On a match, advance both pointers.
5. On the first mismatch, advance the longer-string pointer and also advance the shorter pointer only for a replacement.
6. Reject a second mismatch and accept otherwise.

## Walkthrough

For `first = "pale"` and `second = "ple"`, the first characters match.
At `a` versus `l`, skip `a` in the longer string and compare `l` with `l`.
The remaining characters match, so one deletion is sufficient.

For `first = "pale"` and `second = "bake"`, the mismatches at `p` versus `b` and `l` versus `k` exceed the one-edit budget.

## Complexity

- Time: O(n + m), with at most one linear scan.
- Space: O(1).

## Edge cases

Equal strings are one edit away or fewer because zero edits are allowed.
An empty string is one edit away from a one-character string.
An empty string is not one edit away from a longer string.

## Common mistakes

- Treating insertion and deletion as separate cases duplicates the logic.
- Advancing both pointers after a length-changing mismatch skips a needed comparison.
- Accepting based only on length difference misses replacement mismatches.

## Language notes

Both references normalize the shorter input first.
The Java version uses `charAt`, while the Python version indexes Unicode code points consistently with the problem contract.
