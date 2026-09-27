# Consecutive Numbers

Report each number that occupies at least three successive log ids.
Report a qualifying number only once, even if it has several qualifying runs.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `ConsecutiveNums`; row order is unrestricted.

## Tables

### Logs

| Column | SQLite type |
| --- | --- |
| id | INTEGER |
| num | TEXT |

## Constraints

- Log ids are unique consecutive integers beginning at 1.
- `num` stores a non-null numeric string.
- Physical row order is not significant.

## Examples

### Example 1

```text
Input: {"tables": {"Logs": [[1, "4"], [2, "4"], [3, "4"], [4, "2"]]}}
Output: [["4"]]
Explanation: 4 occupies ids 1, 2, 3.
```

### Example 2

```text
Input: {"tables": {"Logs": [[1, "1"], [2, "2"], [3, "1"]]}}
Output: []
Explanation: No three adjacent ids share a number.
```
