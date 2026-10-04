## Intuition

A period sum equals all views through its right endpoint minus all views strictly before its left endpoint.
One cumulative array allows every query to reuse those totals.

## Brute force

Summing each requested period directly costs O(nq) in the worst case for n days and q queries.
Overlapping periods repeatedly add the same daily counts.

## Approach

Create `prefix` with an initial zero.
After processing i days, `prefix[i]` is the sum of views at indices 0 through i - 1.
Append each daily count to the previous cumulative sum.
For an inclusive query `[l, r]`, return `prefix[r + 1] - prefix[l]`.
The subtraction cancels exactly the days before l and retains both requested endpoints.
Process periods in input order so the result positions correspond directly to the original queries.

## Walkthrough

```text
Input: views = [3, 5, 4, 8, 7, 2, 5, 3, 2, 3], periods = [[0, 1], [0, 5], [5, 8], [3, 3]]
Output: [8, 29, 12, 8]
```

Example 1 builds prefix values `[0, 3, 8, 12, 20, 27, 29, 34, 37, 39, 42]`.
Period `[0, 1]` gives 8 - 0 = 8.
Period `[0, 5]` gives 29, and `[5, 8]` gives 39 - 27 = 12.
The single-day period `[3, 3]` gives 20 - 12 = 8.
Thus the result is `[8, 29, 12, 8]`.

## Complexity

Preprocessing takes O(n) time and each query O(1), for O(n + q) total time.
Extra storage is O(n) for prefixes plus O(q) for output.

## Edge cases

Queries beginning at zero use the initial zero prefix.
A one-day query must retain that day's views.
Zero-view days leave cumulative sums unchanged.

## Common mistakes

Using `prefix[r]` excludes the inclusive right endpoint.
Subtracting `prefix[l + 1]` incorrectly removes the first requested day.

## Language notes

Python builds a list incrementally.
Java allocates an n + 1 integer array; the stated maximum total remains below the signed-int limit.
