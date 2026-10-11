## Intuition

There are two cases: an employee flagged a primary department explicitly, or the employee belongs to exactly one department.

## Approach

1. Select rows with `primary_flag = 'Y'`.
2. Select employees whose group has `COUNT(*) = 1`.
3. Combine both with `UNION`, which also removes overlap.

## Walkthrough

In Example 1, employee 2 has a 'Y' row for department 1 and employee 4 for department 3. Employees 1 and 3 have one row each, so their only department is primary.

## Complexity

- Time: O(N log N) for N rows.
- Space: proportional to the result and any grouping state.

## Edge cases

- A single row flagged 'Y' appears through both branches but only once in the result.
- An employee with several departments has exactly one 'Y'.

## Common mistakes

- Selecting only 'Y' rows misses single-department employees, whose flag is 'N'.

## SQLite notes

In the second branch SQLite returns the non-aggregated `department_id` of the group's single row, which is well defined because the group has one row.
