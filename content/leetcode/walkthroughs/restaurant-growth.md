## Intuition

First total each day, then for each day add up the seven days ending on it. Only days with a full window are reported.

## Approach

1. Aggregate Customer into one row per `visited_on`.
2. Join each day to the days from six days before through itself.
3. Keep days at least six days after the first visit.
4. Report the sum and `ROUND(sum / 7.0, 2)`.

## Walkthrough

In Example 1, the first full window is 2019-01-01 through 2019-01-07, totalling 860, an average of 122.86. On 2019-01-10 two customers paid 130 and 150, so that day contributes 280.

## Complexity

- Time: O(D · 7) for D days after the daily aggregation.
- Space: proportional to the result and any grouping state.

## Edge cases

- Several payments on one day are summed before windowing.
- Fewer than seven days of data produce no rows.

## Common mistakes

- Windowing over raw rows instead of daily totals counts multi-payment days incorrectly.
- Dividing by the number of rows in the window instead of 7.

## SQLite notes

`DATE(day, '-6 days')` computes the window start; a window function with `RANGE` would also work in SQLite 3.28 and later.
