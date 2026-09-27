# Meeting Scheduler

Find the earliest interval of length duration that lies inside one availability interval from each person.
Return `[start,start+duration]`, or an empty list when no meeting fits.
Intervals may touch at endpoints but availability of positive duration is required.

## Constraints

- Each slot array contains 1 to 10000 intervals.
- Within one person's array, intervals do not overlap.
- `0 <= start < end <= 1000000000`; duration is positive.

## Examples

### Example 1

```text
Input: slots1 = [[10, 30]], slots2 = [[20, 40]], duration = 5
Output: [20, 25]
Explanation: The earliest shared start is 20.
```

### Example 2

```text
Input: slots1 = [[1, 3]], slots2 = [[3, 5]], duration = 1
Output: []
Explanation: Touching at one endpoint leaves no time for a meeting.
```
