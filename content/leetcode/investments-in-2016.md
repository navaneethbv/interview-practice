# Investments in 2016

Sum tiv_2016 over policies whose tiv_2015 equals at least one other policy's tiv_2015 and whose (lat, lon) location is unique. Round to two decimals.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text.
Return columns `tiv_2016`; row order is unrestricted.

## Tables

### Insurance

| Column | SQLite type |
| --- | --- |
| pid | INTEGER |
| tiv_2015 | REAL |
| tiv_2016 | REAL |
| lat | REAL |
| lon | REAL |

## Constraints

- pid is unique; values are non-negative.

## Examples

### Example 1

```text
Input: {"tables": {"Insurance": [[1, 10, 5, 10, 10], [2, 20, 20, 20, 20], [3, 10, 30, 20, 20], [4, 10, 40, 40, 40]]}}
Output: [[45]]
Explanation: Policies 1 and 4 qualify: 5 + 40 = 45.
```

### Example 2

```text
Input: {"tables": {"Insurance": [[1, 1.5, 2.25, 0, 0], [2, 1.5, 3.25, 1, 1]]}}
Output: [[5.5]]
Explanation: Both share tiv_2015 and have distinct locations.
```
