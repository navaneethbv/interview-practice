## Intuition

Each project's answer depends on the experience of the employees assigned to it, so join the assignment rows to employees and average per project.

## Approach

1. Join Project to Employee on `employee_id`.
2. Group by `project_id`.
3. Return `ROUND(AVG(experience_years), 2)`.

## Walkthrough

Project 1 in Example 1 has employees with 3, 2 and 1 years, so the average is 2.00. Project 2 has 3 and 2 years, giving 2.50.

## Complexity

- Time: O(P + E) to join and group, where P is the number of assignments and E the number of employees.
- Space: proportional to the result and any grouping state.

## Edge cases

- A single employee's experience is the average.
- Zero years of experience averages to 0.
- Projects with no assignments do not exist in Project, so they produce no row.

## Common mistakes

- Averaging over the Employee table instead of the joined rows.
- Forgetting to round to two decimals.

## SQLite notes

`AVG` returns a floating-point value even for integer columns, so no cast is needed before rounding.
