## Intuition

For subsequences of a given length, a smaller final value leaves more possibilities for future extension.
Store only the smallest known tail for each length in `tails`.
These tails are sorted, letting binary search find where a new value can improve or extend the structure.

## Brute force

Enumerating all subsequences takes exponential time.
A more practical O(n²) DP compares each value with every earlier value, but the tail summary reduces the repeated comparisons to binary searches.

## Approach

1. Use the patience-sorting tail pattern, initially with no active tails.
2. For each `value`, find `position`, the first tail greater than or equal to it.
3. If no such tail exists, append `value`, increasing the maximum length.
4. Otherwise replace that tail with `value`, improving the smallest possible endpoint for that length.
5. Return the number of active tails.

Replacing a tail preserves the existence of a subsequence of that length.
It does not assert that the complete `tails` array itself is a subsequence of the input.
The maintained lengths, rather than a reconstructed sequence, are all this problem asks for.

## Walkthrough

Example 1 uses `[5, 1, 4, 2, 3]`.

| `value` | `position` | Active `tails` afterward |
| --- | --- | --- |
| 5 | 0 | `[5]` |
| 1 | 0 | `[1]` |
| 4 | 1 | `[1, 4]` |
| 2 | 1 | `[1, 2]` |
| 3 | 2 | `[1, 2, 3]` |

Replacing 4 with 2 makes it possible for the later 3 to extend the length to three.
Return 3.

## Complexity

- Time: O(n log n), performing a binary search for each input value.
- Space: O(n), for the tail storage.

## Edge cases

Repeated equal values replace the same tail and do not extend a strictly increasing subsequence.
A decreasing sequence keeps only one active tail.
A fully increasing sequence extends the structure at every step.
Negative values work with ordinary numeric comparisons.

## Common mistakes

- Using the first strictly greater tail allows equal values to extend the sequence.
- Sorting the input destroys the subsequence-order constraint.
- Returning the tail values as a reconstructed subsequence is not generally valid.

## Language notes

Python uses `bisect_left` and a dynamically sized list.
Java implements the same lower-bound search in a helper and tracks the active `size` of a preallocated array.
Unused Java array entries are never searched, so their default zeros cannot affect the answer.
