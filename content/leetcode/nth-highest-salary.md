# Nth Highest Salary

Return the nth largest distinct salary, or null when fewer than n distinct salaries exist.
This SQLite adaptation supplies the positive rank through the bound parameter `:n`; return a SELECT query rather than a stored function.
Alias its result `getNthHighestSalary`.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `getNthHighestSalary`; row order is unrestricted.

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
Input: {"tables": {"Employee": [[1, 40], [2, 60], [3, 60], [4, 20]]}, "params": {"n": 2}}
Output: [[40]]
Explanation: The distinct descending salaries are 60, 40, 20.
```

### Example 2

```text
Input: {"tables": {"Employee": [[1, 7], [2, 7]]}, "params": {"n": 3}}
Output: [[null]]
Explanation: There are too few distinct salaries.
```
