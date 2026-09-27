# My Calendar II

`book(startTime,endTime)` requests a half-open interval `[startTime,endTime)`.
Accept it only if no instant would belong to three accepted bookings.
Return true and retain accepted bookings, or false and leave the calendar unchanged.
Endpoint-touching bookings do not overlap.
Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- `0 <= startTime < endTime <= 1000000000`.
- At most 1000 bookings occur.

## Examples

### Example 1

```text
Input: ctor = [], ops = ["book", "book", "book", "book"], args = [[10, 20], [15, 25], [18, 22], [20, 30]]
Output: [true, true, false, true]
Explanation: The third booking would create a triple overlap and is rejected.
```

### Example 2

```text
Input: ctor = [], ops = ["book", "book", "book"], args = [[1, 2], [2, 3], [1, 3]]
Output: [true, true, true]
Explanation: Every instant is covered by at most two intervals.
```
