# Minimum Time to Complete All Deliveries

Two drones must complete d[0] and d[1] deliveries.
A delivery uses one whole hour, and at most one drone can deliver during an hour.
Drone i cannot deliver at hours divisible by r[i], because those hours are reserved for recharging.
Hours are numbered from 1.
Return the smallest finishing hour that permits every required delivery.

## Examples

### Example 1

```text
Input: d = [2, 1], r = [2, 3]
Output: 3
Explanation: Drone 0 can deliver at hours 1 and 3 while drone 1 uses hour 2.
```

### Example 2

```text
Input: d = [2, 2], r = [2, 2]
Output: 7
Explanation: Both drones can deliver only on odd hours, so four deliveries finish at hour 7.
```

## Constraints

- d and r each contain two integers.
- 1 <= d[i] <= 1000000000.
- 2 <= r[i] <= 30000.
