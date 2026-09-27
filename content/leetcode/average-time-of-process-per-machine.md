# Average Time of Process per Machine

For each machine, average the elapsed time of its processes.
Elapsed time is the end timestamp minus the matching start timestamp.
Round the average to three decimal places.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `machine_id`, `processing_time`; row order is unrestricted.

## Tables

### Activity

| Column | SQLite type |
| --- | --- |
| machine_id | INTEGER |
| process_id | INTEGER |
| activity_type | TEXT |
| timestamp | REAL |

## Constraints

- `(machine_id, process_id, activity_type)` is unique.
- Every process has exactly one start and one end, with start no greater than end.
- Machines have the same number of processes; timestamps are nonnegative real numbers.

## Examples

### Example 1

```text
Input: {"tables": {"Activity": [[0, 1, "start", 1.0], [0, 1, "end", 2.5], [0, 2, "start", 4.0], [0, 2, "end", 6.5]]}}
Output: [[0, 2.0]]
Explanation: Durations 1.5 and 2.5 average to 2.
```

### Example 2

```text
Input: {"tables": {"Activity": [[1, 1, "start", 0.0], [1, 1, "end", 0.0], [2, 1, "start", 1.0], [2, 1, "end", 1.125]]}}
Output: [[1, 0.0], [2, 0.125]]
Explanation: Equal start and end times produce a zero duration.
```
