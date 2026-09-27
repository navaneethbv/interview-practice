# Minimum Number of Refueling Stops

Travel from position 0 to target, spending one unit of fuel per unit of distance.
Start with startFuel, and at a station `[position, fuel]` you may take all its fuel in one stop.
The tank has unlimited capacity.
Return the fewest stops needed to reach target, or -1 when it is impossible.

## Examples

### Example 1

```text
Input: target = 100, startFuel = 10, stations = [[10, 60], [20, 30], [30, 30], [60, 40]]
Output: 2
Explanation: Stop at positions 10 and 60.
```

### Example 2

```text
Input: target = 20, startFuel = 5, stations = [[10, 20]]
Output: -1
Explanation: The first station cannot be reached.
```

## Constraints

- 1 <= target, startFuel <= 1000000000.
- 0 <= stations.length <= 500.
- Stations have strictly increasing positions between 1 and target - 1.
- Station fuel amounts are positive and at most 1000000000.
