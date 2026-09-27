## Intuition

A newer value that is at least as large as an older value makes the older value useless for every future shared window.
It is no smaller and will expire later.
A deque keeps only candidates that have not been dominated or expired.

## Brute force

Compute a fresh maximum for each length-k window.
That takes O((n - k + 1)k) time, approaching quadratic when both the number and size of windows are large.
A monotonic deque reuses information between neighboring windows.

## Approach

1. Use a decreasing monotonic deque named `candidates`, storing indices rather than values.
2. For each `index`, remove front indices at or before `index - k`, because they are outside the current window.
3. Remove back indices whose values are at most the incoming value, because the incoming entry dominates them.
4. Append the current index at the back.
5. Once `index >= k - 1`, append the value at the deque's front to `result`.

Indices remain increasing from front to back, while their values are strictly decreasing.
The front is therefore both valid for the current window and its largest surviving value.
Discarded dominated entries cannot become useful later because the entry that replaced them lasts at least as long.

## Walkthrough

Example 1 uses `[2, 1, 4, 3, 5]` and `k = 3`.
The deque is shown as indices from front to back.

| `index` | Value | `candidates` after updates | Output appended |
| --- | --- | --- | --- |
| 0 | 2 | `[0]` | None |
| 1 | 1 | `[0, 1]` | None |
| 2 | 4 | `[2]` | 4 |
| 3 | 3 | `[2, 3]` | 4 |
| 4 | 5 | `[4]` | 5 |

The returned maxima are `[4, 4, 5]`.
At index 2, value 4 removes both earlier candidates from the back.

## Complexity

- Time: O(n), because each index enters once and leaves at most once from either end.
- Space: O(k) auxiliary deque storage, plus O(n - k + 1) for output.

## Edge cases

For k = 1, every element is its own maximum.
For k = n, exactly one answer is emitted.
Equal values discard the older index, which is safe because the newer equal value expires later.
Negative values use the same comparisons.

## Common mistakes

- Storing only values makes expiration ambiguous for duplicates.
- Removing expired entries from the back violates chronological order.
- Emitting an answer before a full window exists produces extra results.

## Language notes

Python uses `collections.deque`, allowing constant-time removal at both ends.
Java uses `ArrayDeque<Integer>` with explicit first/last operations.
A Python list with front removal would introduce linear shifting and lose the linear total-time bound.
