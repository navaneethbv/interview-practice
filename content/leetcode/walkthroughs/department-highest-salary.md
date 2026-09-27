## Intuition

The maximum salary must be computed separately for each department, and every employee tied at that maximum should remain.
`DENSE_RANK` gives all equal top salaries rank one without discarding ties.

## Brute force

A correlated subquery could compare each employee with the maximum salary for that employee's department.
That expresses the rule but may repeat the same department calculation for many employees.

## Approach

1. Rank employees by descending salary inside each `departmentId` partition.
2. Join the ranked rows to `Department` to obtain the department name.
3. Keep only rows whose rank is one and project the required aliases.

## Walkthrough

For Example 1, the Tools salaries are 90, 90, 80, 70, and 60.
The two 90 rows both receive `DENSE_RANK() = 1`, while the remaining rows receive larger ranks.
Filtering rank one returns Tools with A and B, both at 90.

## Complexity

The window ranking and join require plan-dependent time, commonly dominated by sorting employees within department partitions.
The window operation may use temporary storage proportional to the employee rows, and SQLite chooses the physical strategy.

## Edge cases

Departments with no employees contribute no rows because the ranked employee rows drive the join.
Equal salaries must produce multiple rows, and row order is unrestricted by the spec.

## Common mistakes

- `ROW_NUMBER` removes tied employees after the first one.
- Ranking after joining without partitioning by department mixes unrelated salaries.
- Adding an `ORDER BY` is unnecessary because this result uses unordered comparison.

## SQLite notes

This reference uses SQLite's supported `DENSE_RANK` window function and a common table expression.
The query does not promise a row order, and its sort cost depends on indexes and the SQLite query plan.
