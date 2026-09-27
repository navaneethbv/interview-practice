# Count Salary Categories

Return exactly three rows counting accounts in these categories: `Low Salary` for income below 20000, `Average Salary` for income from 20000 through 50000 inclusive, and `High Salary` for income above 50000.
Include categories whose count is zero.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `category`, `accounts_count`; row order is unrestricted.

## Tables

### Accounts

| Column | SQLite type |
| --- | --- |
| account_id | INTEGER |
| income | INTEGER |

## Constraints

- Account ids are unique.
- Income is a non-null nonnegative integer.

## Examples

### Example 1

```text
Input: {"tables": {"Accounts": [[1, 19999], [2, 20000], [3, 50000], [4, 50001]]}}
Output: [["Low Salary", 1], ["Average Salary", 2], ["High Salary", 1]]
Explanation: Both endpoints belong to Average Salary.
```

### Example 2

```text
Input: {"tables": {"Accounts": []}}
Output: [["Low Salary", 0], ["Average Salary", 0], ["High Salary", 0]]
Explanation: All category rows must still be returned.
```
