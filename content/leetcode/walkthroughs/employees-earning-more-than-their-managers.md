## Intuition

Each employee row stores a manager id, so the Employee table must be joined to itself.
The employee alias supplies the worker salary and name.
The manager alias supplies the comparison salary for the same manager id.

## Brute force

A correlated subquery could look up each manager salary separately for every employee.
That expresses the relationship but may repeat the lookup and is harder to read.
A self-join makes both roles explicit in one relational operation.

## Approach

1. Alias one Employee instance as e for employees.
2. Alias another Employee instance as m for managers.
3. Join e.managerId to m.id.
4. Keep rows where e.salary is greater than m.salary.
5. Select the employee name under the required Employee column label.

## Walkthrough

Example 1 has Ada earning 80 with manager id 2 and Ben earning 70 with no manager.
The self-join matches Ada to Ben through manager id 2.
Ada's salary is greater than Ben's salary, so Ada is selected.
Ben has no manager row and cannot satisfy the join.

## Complexity

With E employee rows and no supporting index, a nested-loop self-join can take O(E squared) time.
An index on manager id can improve the physical plan, while join workspace and output storage depend on SQLite's chosen plan.
The query returns only matching names and does not mutate the table.

## Edge cases

Employees without managers are excluded by the inner join.
Equal salaries do not satisfy the strict greater-than condition.
Multiple employees may share one manager and can each appear.
The manager id is matched to the manager's id, not name.

## Common mistakes

- Joining on manager name risks duplicate or missing matches.
- Using greater-than-or-equal includes equal salaries incorrectly.
- Selecting manager.name returns the wrong role.
- A left join can accidentally retain employees without managers.

## SQLite notes

SQLite uses the same table twice with aliases e and m.
The result column is explicitly named Employee to match the contract.
The local SQL reference contains no Python or Java companion.
