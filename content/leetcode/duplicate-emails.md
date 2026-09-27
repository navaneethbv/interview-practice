# Duplicate Emails

Return each email address that occurs in more than one Person row, exactly once.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `Email`; row order is unrestricted.

## Tables

### Person

| Column | SQLite type |
| --- | --- |
| id | INTEGER |
| email | TEXT |

## Constraints

- Person ids are unique.
- Emails are non-null lowercase strings.
- The table may be empty.

## Examples

### Example 1

```text
Input: {"tables": {"Person": [[5, "a@x"], [2, "a@x"], [7, "b@x"]]}}
Output: [["a@x"]]
Explanation: The address a@x appears twice; its smallest id is 2.
```

### Example 2

```text
Input: {"tables": {"Person": [[1, "q@x"]]}}
Output: []
Explanation: The sole row has no duplicate.
```
