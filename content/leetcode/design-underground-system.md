# Design Underground System

Track travel times on a metro line.
`checkIn(id, stationName, t)` records that customer `id` entered at `stationName` at time `t`.
`checkOut(id, stationName, t)` records that the same customer left at `stationName` at time `t`, completing a trip.
`getAverageTime(startStation, endStation)` returns the average duration of every completed trip that started at `startStation` and ended at `endStation`.
Trips in the opposite direction are a different route.

Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- A customer is checked in at most once at a time and checks out after checking in.
- Times strictly increase across calls.
- `getAverageTime` is only called for routes with at least one completed trip.
- Answers within 1e-5 are accepted.

## Examples

### Example 1

```text
Input: ops = ["checkIn", "checkIn", "checkOut", "checkOut", "getAverageTime", "checkIn", "checkOut", "getAverageTime"], args = [[45, "Leyton", 3], [32, "Paradise", 8], [45, "Waterloo", 15], [32, "Cambridge", 22], ["Leyton", "Waterloo"], [10, "Leyton", 24], [10, "Waterloo", 38], ["Leyton", "Waterloo"]]
Output: [null, null, null, null, 12, null, null, 13]
Explanation: The two Leyton to Waterloo trips take 12 and 14, averaging 13.
```

### Example 2

```text
Input: ops = ["checkIn", "checkOut", "checkIn", "checkOut", "getAverageTime"], args = [[1, "A", 1], [1, "B", 4], [2, "B", 5], [2, "A", 7], ["A", "B"]]
Output: [null, null, null, null, 3]
Explanation: The B to A trip is a different route and does not count.
```
