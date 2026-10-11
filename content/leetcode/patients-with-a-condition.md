# Patients With a Condition

conditions holds space-separated codes. Report patients with type I diabetes: a code that starts with the prefix DIAB1.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text.
Return columns `patient_id`, `patient_name`, `conditions`; row order is unrestricted.

## Tables

### Patients

| Column | SQLite type |
| --- | --- |
| patient_id | INTEGER |
| patient_name | TEXT |
| conditions | TEXT |

## Constraints

- Codes contain only uppercase letters and digits and are separated by single spaces.

## Examples

### Example 1

```text
Input: {"tables": {"Patients": [[1, "Daniel", "YFEV COUGH"], [2, "Alice", ""], [3, "Bob", "DIAB100 MYOP"], [4, "George", "ACNE DIAB100"], [5, "Alain", "DIAB201"]]}}
Output: [[3, "Bob", "DIAB100 MYOP"], [4, "George", "ACNE DIAB100"]]
Explanation: Bob and George have a code starting with DIAB1; DIAB201 does not match.
```

### Example 2

```text
Input: {"tables": {"Patients": [[6, "Eve", "SADIAB100"]]}}
Output: []
Explanation: DIAB1 must start a code, not appear inside one.
```
