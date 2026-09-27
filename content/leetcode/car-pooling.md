# Car Pooling

Each trip [passengers,from,to] picks up passengers at from and drops them at to while the car travels only east.
Return whether the car can fulfill all trips without exceeding `capacity`.
Drop-offs at a location occur before pickups there.

## Examples

### Example 1

```text
Input: trips = [[2, 1, 5], [3, 3, 7]], capacity = 4
Output: false
Explanation: Five passengers overlap between locations 3 and 5.
```

### Example 2

```text
Input: trips = [[2, 1, 5], [3, 5, 7]], capacity = 3
Output: true
Explanation: The first passengers leave before the second group boards.
```

## Constraints

- 1 <= trips.length <= 1,000
- 1 <= passengers <= 100
- 0 <= from < to <= 1,000
- 1 <= capacity <= 100,000
