# Design Log Storage System

Store logs with `put(id,timestamp)`, where timestamps use `YYYY:MM:DD:HH:MM:SS`.
`retrieve(start,end,granularity)` returns ids whose timestamps fall within the inclusive range when compared only through the requested component.
For example, Day ignores hours, minutes, and seconds in all three timestamps.
Return retrieved ids in any order.
Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- Log ids are unique.
- Timestamps are valid, with years from 2000 through 2017.
- Granularity is Year, Month, Day, Hour, Minute, or Second.
- At most 500 operations occur.

## Examples

### Example 1

```text
Input: ctor = [], ops = ["put", "put", "retrieve"], args = [[1, "2017:01:01:01:00:00"], [2, "2017:01:02:00:00:00"], ["2017:01:01:12:00:00", "2017:01:01:13:00:00", "Day"]]
Output: [null, null, [1]]
Explanation: Day granularity includes all times on January 1.
```

### Example 2

```text
Input: ctor = [], ops = ["put", "retrieve"], args = [[3, "2016:12:31:23:59:59"], ["2017:01:01:00:00:00", "2017:12:31:23:59:59", "Year"]]
Output: [null, []]
Explanation: The 2016 log falls outside the requested year.
```
