# My Calendar I

`book(startTime,endTime)` requests a half-open time interval.
Accept and retain it only when it has no overlap with an earlier accepted booking.
Return false without changing the calendar when it conflicts.
Adjacent intervals may share an endpoint.
Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- `0 <= startTime < endTime <= 1000000000`.
- At most 1000 bookings occur.

## Examples

### Example 1

```text
Input: ctor = [], ops = ["book", "book", "book"], args = [[10, 20], [15, 25], [20, 30]]
Output: [true, false, true]
Explanation: The conflicting middle request is rejected; touching endpoints are allowed.
```

### Example 2

```text
Input: ctor = [], ops = ["book", "book"], args = [[1, 5], [1, 5]]
Output: [true, false]
Explanation: A duplicate interval conflicts.
```
