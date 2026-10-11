## Intuition

Each employee row points to its manager, so a self join pairs every report with its manager and lets us aggregate per manager.

## Approach

1. Join Employees `e` to Employees `m` on `m.employee_id = e.reports_to`.
2. Group by the manager.
3. Count reports and average their ages, rounding halves up.
4. Order by manager id.

## Walkthrough

In Example 1, Hercy manages Alice (41) and Bob (36). The average 38.5 rounds up to 39.

## Complexity

- Time: O(N log N) for N employees.
- Space: proportional to the result and any grouping state.

## Edge cases

- Employees with no reports do not appear.
- Only direct reports count, not reports of reports.
- An average ending in .5 rounds up.

## Common mistakes

- Using `ROUND(AVG(age))` without checking rounding behaviour; in SQLite `ROUND` rounds halves away from zero, which also works for positive ages, but adding 0.5 and truncating states the intent explicitly.
- Grouping by the employee instead of the manager.

## SQLite notes

`CAST(x + 0.5 AS INTEGER)` truncates toward zero, which rounds half up for the positive ages here.
