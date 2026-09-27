## Intuition

Every employee must remain in the result, even when no unique identifier exists.
A LEFT JOIN keeps the employee row and supplies NULL for a missing mapping.

## Brute force

Filtering Employees against UNI would lose employees without a matching identifier.
A correlated lookup can also repeat the same search for each employee.

## Approach

1. Start with Employees as the preserved table.
2. LEFT JOIN EmployeeUNI on the employee id.
3. Select the unique identifier followed by the employee name.

## Walkthrough

Example 1:

Employees contains Ana with id 1 and Bo with id 2.
EmployeeUNI maps only id 2 to unique id 9.
The left join returns NULL and Ana for id 1 and 9 and Bo for id 2, with row order left unspecified.

## Complexity

The query returns one row for every employee mapping combination.
Without useful indexes, a generic join can take O(E times U) work, while SQLite may choose a faster plan from available indexes.
Result storage is proportional to the number of returned rows.

## Edge cases

An employee without a mapping gets SQL NULL.
If the mapping table contains duplicate rows for one employee, the join preserves both rows.
Employees without any rows in UNI still appear.

## Common mistakes

Do not use INNER JOIN because it drops unmatched employees.
Join on id rather than employee name.
Keep the requested column order unique_id then name.

## SQLite notes

The reference uses SQLite-compatible LEFT JOIN syntax.
The query leaves row ordering to the database because no order is specified by the contract.
NULL is a SQL value and is not replaced with a fabricated identifier.
