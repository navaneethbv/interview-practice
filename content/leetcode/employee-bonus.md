# Employee Bonus

List employees whose bonus is below 1000 or whose bonus record is absent.
Show null as the bonus when no record exists.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `name`, `bonus`; row order is unrestricted.

## Tables

### Employee

| Column | SQLite type |
| --- | --- |
| empId | INTEGER |
| name | TEXT |
| supervisor | INTEGER |
| salary | INTEGER |

### Bonus

| Column | SQLite type |
| --- | --- |
| empId | INTEGER |
| bonus | INTEGER |

## Constraints

- `empId` is unique within each table.
- Every Bonus row references an employee.
- Names and salaries are non-null; supervisor may be null.
- Recorded bonuses are non-null nonnegative integers.

## Examples

### Example 1

```text
Input: {"tables": {"Employee": [[1, "Ana", null, 3000], [2, "Bo", 1, 2000], [3, "Cy", 1, 2000]], "Bonus": [[2, 999], [3, 1000]]}}
Output: [["Ana", null], ["Bo", 999]]
Explanation: The threshold is strict and missing bonuses qualify.
```

### Example 2

```text
Input: {"tables": {"Employee": [[1, "Dee", null, 1]], "Bonus": [[1, 0]]}}
Output: [["Dee", 0]]
Explanation: Zero is a recorded qualifying bonus.
```
