# Department Highest Salary

Return all employees tied for the largest salary within their own department.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `Department`, `Employee`, `Salary`; row order is unrestricted.

## Tables

### Employee

| Column | SQLite type |
| --- | --- |
| id | INTEGER |
| name | TEXT |
| salary | INTEGER |
| departmentId | INTEGER |

### Department

| Column | SQLite type |
| --- | --- |
| id | INTEGER |
| name | TEXT |

## Constraints

- Employee and Department ids are unique in their own tables.
- Every employee references an existing department.
- Names and salaries are non-null; names may repeat.
- Departments without employees contribute no rows.

## Examples

### Example 1

```text
Input: {"tables": {"Department": [[1, "Tools"]], "Employee": [[1, "A", 90, 1], [2, "B", 90, 1], [3, "C", 80, 1], [4, "D", 70, 1], [5, "E", 60, 1]]}}
Output: [["Tools", "A", 90], ["Tools", "B", 90]]
Explanation: Ties share a salary rank.
```

### Example 2

```text
Input: {"tables": {"Department": [[1, "Ops"], [2, "Sales"]], "Employee": [[1, "A", 30, 1], [2, "B", 20, 2]]}}
Output: [["Ops", "A", 30], ["Sales", "B", 20]]
Explanation: Each department is evaluated independently.
```
