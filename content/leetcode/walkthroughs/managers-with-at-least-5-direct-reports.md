## Intuition

A manager appears in the Employee table as the id referenced by direct reports.
Join each report row to its manager row, then group the joined rows by manager.
The grouped manager row supplies the name after the join has matched direct reports.

## Brute force

A correlated count subquery could count reports for each manager separately.
That may repeat the same scan for every manager.
Grouping one joined relation expresses all report counts together.

## Approach

1. Alias the manager row as m and report rows as e.
2. Join e.managerId to m.id.
3. Group by the manager identity and name.
4. Keep groups whose count is at least five.
5. Select the manager name.

## Walkthrough

Example 1 gives Boss id 1 and five employees whose managerId is 1.
The join creates five report rows for Boss.
Grouping by Boss produces count 5, satisfying the threshold.
The query returns Boss.

## Complexity

With E rows and no supporting index, a self-join and grouping can take O(E squared) time.
Indexes and SQLite's chosen grouping plan can improve this bound.
The result and grouping workspace depend on the physical plan and number of matching rows.

## Edge cases

Exactly five reports qualifies.
A manager with fewer than five reports is excluded.
Employees without managers do not form report groups for a manager.
Grouping includes the manager id to distinguish same-named managers.

## Common mistakes

- Counting all employees instead of direct reports includes unrelated rows.
- Grouping only by name merges distinct managers with the same name.
- Using greater than five excludes the exact threshold.
- Joining the wrong direction counts managers rather than reports.

## SQLite notes

The local SQL reference uses a self-join, GROUP BY, and HAVING COUNT(*) greater than or equal to five.
The selected column is the manager name.
No Python or Java reference applies to this SQL problem.
