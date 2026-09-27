# Bus Routes

Each route lists stops served repeatedly by one bus in a cycle.
You start at `source` without boarding a bus.
Return the fewest different bus rides needed to reach `target`, transferring only at shared stops, or -1 if impossible.
If source equals target, no ride is needed.

## Examples

### Example 1

```text
Input: routes = [[1, 2, 7], [3, 6, 7]], source = 1, target = 6
Output: 2
Explanation: Ride the first bus to 7, then transfer to the second.
```

### Example 2

```text
Input: routes = [[1, 2]], source = 1, target = 1
Output: 0
Explanation: You are already at the destination.
```

## Constraints

- 1 <= routes.length <= 500
- Each route contains 1 through 100,000 distinct stops; total route entries are at most 100,000.
- 0 <= stops, source, target < 10^6
