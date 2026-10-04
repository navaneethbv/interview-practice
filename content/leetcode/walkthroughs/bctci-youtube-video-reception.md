## Intuition

Convert each day into an indicator: one when likes strictly exceed dislikes, zero otherwise.
A period's positive-day count is then an ordinary range sum over those indicators.

## Brute force

Scanning every requested period independently can take O(nq) time for n days and q periods.
Prefix sums reuse the daily classifications across all queries.

## Approach

Start prefix with zero.
For each paired like and dislike count, append the previous prefix plus its positive-day indicator.
Thus prefix[i] counts positive days strictly before index i.
For an inclusive period `[l, r]`, return `prefix[r + 1] - prefix[l]`.
The subtraction removes exactly the days before l and retains the day at r.
Answer queries in their original order to preserve their correspondence with periods.

## Walkthrough

```text
Input: likes = [6, 3, 4, 8, 7, 2, 6, 5, 0, 1], dislikes = [6, 0, 8, 0, 0, 0, 1, 8, 0, 2], periods = [[0, 1], [0, 5], [5, 8], [3, 3]]
Output: [1, 4, 2, 1]
```

Example 1 has positive-day indicators `[0, 1, 0, 1, 1, 1, 1, 0, 0, 0]`.
Period `[0, 1]` contains one positive day.
Period `[0, 5]` contains four, while `[5, 8]` contains two.
The single-day period `[3, 3]` contains one because day 3 has eight likes and zero dislikes.
The result is `[1, 4, 2, 1]`.

## Complexity

Building prefix takes O(n) time and each query takes O(1), for O(n + q) total time.
The prefix array uses O(n) space and the returned counts use O(q).
No original likes or dislikes values are changed.

## Edge cases

Equal likes and dislikes do not make a positive day.
Periods beginning at zero use the initial zero prefix.
A single-day period may return zero or one.

## Common mistakes

Do not sum like-dislike differences; the task counts positive days rather than net reception.
Do not omit the inclusive final day from the query formula.

## Language notes

Python converts the comparison into an explicit zero-or-one contribution.
Java stores prefix counts in int safely because no count exceeds the number of days.
