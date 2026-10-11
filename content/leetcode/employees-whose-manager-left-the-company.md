# Employees Whose Manager Left the Company

Report employees earning strictly less than 30000 whose manager_id refers to someone no longer in the table. Order by employee_id.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text.
Return columns `employee_id`; rows must appear in the order described.

## Tables

### Employees

| Column | SQLite type |
| --- | --- |
| employee_id | INTEGER |
| name | TEXT |
| manager_id | INTEGER |
| salary | INTEGER |

## Constraints

- employee_id is unique.

## Examples

### Example 1

```text
Input: {"tables": {"Employees": [[3, "Mila", 9, 60301], [12, "Antonella", null, 31000], [13, "Emery", null, 67084], [1, "Kalel", 11, 21241], [9, "Mikaela", null, 50937], [11, "Joziah", 6, 28485]]}}
Output: [[11]]
Explanation: Kalel's manager 11 is present; Joziah's manager 6 left.
```

### Example 2

```text
Input: {"tables": {"Employees": [[1, "A", 7, 30000]]}}
Output: []
Explanation: A salary of exactly 30000 is not less than 30000.
```
