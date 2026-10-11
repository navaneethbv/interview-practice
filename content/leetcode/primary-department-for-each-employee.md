# Primary Department for Each Employee

Employees in several departments mark one as primary with primary_flag 'Y'. An employee in a single department has flag 'N' there. Report each employee's primary department.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text.
Return columns `employee_id`, `department_id`; row order is unrestricted.

## Tables

### Employee

| Column | SQLite type |
| --- | --- |
| employee_id | INTEGER |
| department_id | INTEGER |
| primary_flag | TEXT |

## Constraints

- (employee_id, department_id) is unique; an employee in several departments has exactly one 'Y'.

## Examples

### Example 1

```text
Input: {"tables": {"Employee": [[1, 1, "N"], [2, 1, "Y"], [2, 2, "N"], [3, 3, "N"], [4, 2, "N"], [4, 3, "Y"], [4, 4, "N"]]}}
Output: [[1, 1], [2, 1], [3, 3], [4, 3]]
Explanation: Employees 1 and 3 belong to one department each.
```

### Example 2

```text
Input: {"tables": {"Employee": [[7, 5, "Y"]]}}
Output: [[7, 5]]
Explanation: A lone 'Y' row is also primary.
```
