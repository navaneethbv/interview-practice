# Second Highest Salary

Return the second-largest distinct salary.
Return one row containing null if it does not exist.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `SecondHighestSalary`; row order is unrestricted.

## Tables

### Employee

| Column | SQLite type |
| --- | --- |
| id | INTEGER |
| salary | INTEGER |

## Constraints

- Employee ids are unique and salaries are non-null integers.
- Repeated salaries count only once.
- Employee may be empty.

## Examples

### Example 1

```text
Input: {"tables": {"Employee": [[1, 40], [2, 60], [3, 60], [4, 20]]}}
Output: [[40]]
Explanation: The distinct descending salaries are 60, 40, 20.
```

### Example 2

```text
Input: {"tables": {"Employee": [[1, 7], [2, 7]]}}
Output: [[null]]
Explanation: There are too few distinct salaries.
```
