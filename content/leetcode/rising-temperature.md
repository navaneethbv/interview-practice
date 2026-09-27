# Rising Temperature

Return the id of each date whose temperature is higher than the previous calendar day.
A missing previous date provides no comparison; compare calendar dates rather than neighboring input rows.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `id`; row order is unrestricted.

## Tables

### Weather

| Column | SQLite type |
| --- | --- |
| id | INTEGER |
| recordDate | TEXT |
| temperature | INTEGER |

## Constraints

- Ids and recordDate values are unique.
- Temperatures are non-null integers.

## Examples

### Example 1

```text
Input: {"tables": {"Weather": [[1, "2024-03-01", 10], [2, "2024-03-02", 12], [3, "2024-03-04", 15]]}}
Output: [[2]]
Explanation: March 4 has no March 3 reading.
```

### Example 2

```text
Input: {"tables": {"Weather": [[9, "2024-02-29", 5], [8, "2024-03-01", 6]]}}
Output: [[8]]
Explanation: Leap day is the previous calendar day.
```
