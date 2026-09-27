# Employees Earning More Than Their Managers

Return the name of each employee whose salary strictly exceeds the salary of their direct manager.
Employees without a manager do not qualify.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `Employee`; row order is unrestricted.

## Tables

### Employee

| Column | SQLite type |
| --- | --- |
| id | INTEGER |
| name | TEXT |
| salary | INTEGER |
| managerId | INTEGER |

## Constraints

- `id` is unique; `managerId` is null or references another employee.
- Names and salaries are non-null.
- Names need not be unique.

## Examples

### Example 1

```text
Input: {"tables": {"Employee": [[1, "Ada", 80, 2], [2, "Ben", 70, null]]}}
Output: [["Ada"]]
Explanation: Ada earns more than Ben.
```

### Example 2

```text
Input: {"tables": {"Employee": [[1, "Cy", 50, 2], [2, "Dee", 50, null]]}}
Output: []
Explanation: Equal pay is not greater pay.
```
