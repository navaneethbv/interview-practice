## Intuition

A manager has left when their id no longer appears in the table, so test membership with a subquery.

## Approach

1. Keep employees with `salary < 30000`.
2. Require a non-null `manager_id` that is not in `SELECT employee_id FROM Employees`.
3. Order by `employee_id`.

## Walkthrough

In Example 1, Kalel earns 21241 and reports to 11, who is present. Joziah earns 28485 and reports to 6, who is missing, so Joziah is returned.

## Complexity

- Time: O(N log N) with an index or hash lookup on `employee_id`.
- Space: proportional to the result and any grouping state.

## Edge cases

- A salary of exactly 30000 is excluded.
- Employees with no manager are excluded.

## Common mistakes

- Omitting `manager_id IS NOT NULL`; `NOT IN` with a null manager evaluates to null rather than true, which happens to exclude it, but the rule should be explicit.

## SQLite notes

`NOT IN` is safe here because `employee_id` is never null; with nullable subquery results, prefer `NOT EXISTS`.
