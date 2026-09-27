# Replace Employee ID With The Unique Identifier

List employees with their corresponding unique identifiers.
If an employee has no mapping, return null as their unique id.
If multiple mappings exist, retain each matching mapping.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `unique_id`, `name`; row order is unrestricted.

## Tables

### Employees

| Column | SQLite type |
| --- | --- |
| id | INTEGER |
| name | TEXT |

### EmployeeUNI

| Column | SQLite type |
| --- | --- |
| id | INTEGER |
| unique_id | INTEGER |

## Constraints

- Employee ids are unique.
- `(id, unique_id)` pairs in EmployeeUNI are unique and refer to employees.
- Names and mapped identifiers are non-null; names may repeat.

## Examples

### Example 1

```text
Input: {"tables": {"Employees": [[1, "Ana"], [2, "Bo"]], "EmployeeUNI": [[2, 9]]}}
Output: [[null, "Ana"], [9, "Bo"]]
Explanation: An unmapped employee remains in the result.
```

### Example 2

```text
Input: {"tables": {"Employees": [[1, "Cy"]], "EmployeeUNI": [[1, 5], [1, 7]]}}
Output: [[5, "Cy"], [7, "Cy"]]
Explanation: Both mapping rows are preserved.
```
