## Intuition

Restrict to the 30-day window, then count distinct users per date.

## Approach

1. Keep rows with `activity_date BETWEEN '2019-06-28' AND '2019-07-27'`.
2. Group by `activity_date`.
3. Count `DISTINCT user_id` and alias the date as `day`.

## Walkthrough

In Example 1, users 1 and 2 are active on 2019-07-20 and users 2 and 3 on 2019-07-21. The 2019-06-25 activity falls outside the window.

## Complexity

- Time: O(A log A) for A activity rows.
- Space: proportional to the result and any grouping state.

## Edge cases

- Both window ends are inclusive.
- Several activities by one user on a day count once.
- Days without activity are absent rather than zero.

## Common mistakes

- Starting the window on 2019-06-27, which makes it 31 days long.
- Counting rows instead of distinct users.

## SQLite notes

ISO `YYYY-MM-DD` strings compare correctly as text, so `BETWEEN` works without date functions.
