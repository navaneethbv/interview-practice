# Median Employee Salary

For each company, sort employees by salary ascending, breaking equal salaries by id ascending.
Return the central employee when the count is odd, or both central employees when it is even.
Return their existing rows, not an averaged salary.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `id`, `company`, `salary`; row order is unrestricted.

## Tables

### Employee

| Column | SQLite type |
| --- | --- |
| id | INTEGER |
| company | TEXT |
| salary | INTEGER |

## Constraints

- Employee ids are unique.
- Company names and salaries are non-null.
- Salaries are nonnegative integers.

## Examples

### Example 1

```text
Input: {"tables": {"Employee": [[1, "A", 10], [2, "A", 20], [3, "A", 30], [4, "B", 5], [5, "B", 9]]}}
Output: [[2, "A", 20], [4, "B", 5], [5, "B", 9]]
Explanation: A has one middle employee; B has two.
```

### Example 2

```text
Input: {"tables": {"Employee": [[7, "X", 8], [2, "X", 8], [4, "X", 8]]}}
Output: [[4, "X", 8]]
Explanation: Id order resolves equal salaries.
```
