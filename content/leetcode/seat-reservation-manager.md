# Seat Reservation Manager

Seats are numbered 1 to `n` and all start unreserved.
`reserve()` reserves the smallest-numbered unreserved seat and returns its number.
`unreserve(seatNumber)` frees a reserved seat.

Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- `reserve` is only called when a seat is free.
- `unreserve` is only called for reserved seats.

## Examples

### Example 1

```text
Input: ctor = [5], ops = ["reserve", "reserve", "unreserve", "reserve", "reserve", "reserve", "reserve", "unreserve"], args = [[], [], [2], [], [], [], [], [5]]
Output: [1, 2, null, 2, 3, 4, 5, null]
Explanation: Seat 2 is freed and is the smallest free seat when reserve is next called.
```

### Example 2

```text
Input: ctor = [1], ops = ["reserve", "unreserve", "reserve"], args = [[], [1], []]
Output: [1, null, 1]
Explanation: A single seat is reused.
```
