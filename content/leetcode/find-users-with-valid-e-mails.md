# Find Users With Valid E-Mails

A valid email has a prefix that starts with a letter and contains only letters, digits, underscores, periods or dashes, followed by the domain @leetcode.com exactly. Report users with valid emails.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text.
Return columns `user_id`, `name`, `mail`; row order is unrestricted.

## Tables

### Users

| Column | SQLite type |
| --- | --- |
| user_id | INTEGER |
| name | TEXT |
| mail | TEXT |

## Constraints

- SQLite has no REGEXP function by default; GLOB is case-sensitive and supports character classes.

## Examples

### Example 1

```text
Input: {"tables": {"Users": [[1, "Winston", "winston@leetcode.com"], [2, "Jonathan", "jonathanisgreat"], [3, "Annabelle", "bella-@leetcode.com"], [4, "Sally", "sally.come@leetcode.com"], [5, "Marwan", "quarz#2020@leetcode.com"], [6, "David", "david69@gmail.com"], [7, "Shapiro", ".shapo@leetcode.com"]]}}
Output: [[1, "Winston", "winston@leetcode.com"], [3, "Annabelle", "bella-@leetcode.com"], [4, "Sally", "sally.come@leetcode.com"]]
Explanation: Marwan's prefix contains '#', and Shapiro's starts with a period.
```

### Example 2

```text
Input: {"tables": {"Users": [[8, "Kim", "k@LEETCODE.com"]]}}
Output: []
Explanation: The domain must match exactly.
```
