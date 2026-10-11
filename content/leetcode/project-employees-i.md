# Project Employees I

For each project, report the average experience of its employees, rounded to two decimal places.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text.
Return columns `project_id`, `average_years`; row order is unrestricted.

## Tables

### Project

| Column | SQLite type |
| --- | --- |
| project_id | INTEGER |
| employee_id | INTEGER |

### Employee

| Column | SQLite type |
| --- | --- |
| employee_id | INTEGER |
| name | TEXT |
| experience_years | INTEGER |

## Constraints

- (project_id, employee_id) is unique; experience_years is never null.

## Examples

### Example 1

```text
Input: {"tables": {"Project": [[1, 1], [1, 2], [1, 3], [2, 1], [2, 4]], "Employee": [[1, "Khaled", 3], [2, "Ali", 2], [3, "John", 1], [4, "Doe", 2]]}}
Output: [[1, 2], [2, 2.5]]
Explanation: Project 1 averages (3 + 2 + 1) / 3 = 2.00 and project 2 averages 2.50.
```

### Example 2

```text
Input: {"tables": {"Project": [[5, 1]], "Employee": [[1, "Solo", 7]]}}
Output: [[5, 7]]
Explanation: A single employee's experience is the average.
```
