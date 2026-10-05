## Intuition

The phrase top three distinct salaries requires ranking salary values, not employees.
`DENSE_RANK` gives tied employees the same rank, so every employee at ranks 1 through 3 can be selected.

## Brute force

For each employee, repeatedly counting how many distinct salaries in the same department are larger is a correlated approach that can rescan the department.
The window function computes all department-local ranks in one relational operation.

## Approach

1. Rank `Employee` rows within each `departmentId` by descending salary using `DENSE_RANK`.
2. Keep rows whose rank is at most 3.
3. Join those rows to `Department` to replace the numeric department id with its name.
4. Return the three requested aliases, leaving row order unrestricted under the local contract.

## Walkthrough

In Example 1, the `Tools` salaries 90, 90, 80, 70, and 60 receive dense ranks 1, 1, 2, 3, and 4.
The two employees at 90 both qualify because ties share rank 1.
The 80 and 70 employees qualify at ranks 2 and 3, while the 60 employee is filtered out.
The join supplies `Tools` for each selected row, producing the four expected records.

## Complexity

SQLite may sort rows for each department to evaluate the window function, so ranking can require O(e log e) work and temporary storage.
The join may use an index or a nested-loop plan, so its exact cost depends on table sizes and indexes.

## Edge cases

A department with fewer than three distinct salaries returns all its employees.
Many employees can share one salary rank and all ties at rank 3 are included.
Departments without employees contribute no rows because the ranked employee rows drive the join.

## Common mistakes

Use `DENSE_RANK`, not `ROW_NUMBER`, or tied salaries could be split across ranks.
Partition by department before ordering salaries.
Filter the rank after the window calculation, not the raw salary globally.

## SQLite notes

SQLite supports `DENSE_RANK() OVER (PARTITION BY .. ORDER BY ..)` and the aliases used by the reference.
The spec compares rows without order, so no `ORDER BY` is promised or needed in the final query.
