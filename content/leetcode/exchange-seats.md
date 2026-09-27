# Exchange Seats

Swap the students occupying seats 1 and 2, 3 and 4, and so on.
If the final seat is unpaired, its student stays in place.
Return the new assignments ordered by id ascending.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `id`, `student` in the required row order.

## Tables

### Seat

| Column | SQLite type |
| --- | --- |
| id | INTEGER |
| student | TEXT |

## Constraints

- Seat ids are unique consecutive integers beginning at 1.
- Student names are non-null and may repeat.

## Examples

### Example 1

```text
Input: {"tables": {"Seat": [[1, "Ana"], [2, "Bo"], [3, "Cy"]]}}
Output: [[1, "Bo"], [2, "Ana"], [3, "Cy"]]
Explanation: The final seat remains unchanged.
```

### Example 2

```text
Input: {"tables": {"Seat": [[1, "Dee"], [2, "Eli"]]}}
Output: [[1, "Eli"], [2, "Dee"]]
Explanation: The sole pair swaps.
```
