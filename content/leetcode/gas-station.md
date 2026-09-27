# Gas Station

Stations lie on a circular route.
At station i, collect `gas[i]` units of fuel, then spend `cost[i]` units to reach the next station.
Your tank starts empty and has no capacity limit.
Return the index of a station from which you can complete one clockwise circuit, or -1 if impossible.
If a feasible starting station exists, it is unique.

## Examples

### Example 1

```text
Input: gas = [1, 2, 3, 4, 5], cost = [3, 4, 5, 1, 2]
Output: 3
Explanation: Starting at index 3 gives enough fuel to complete the circle.
```

### Example 2

```text
Input: gas = [2, 3, 4], cost = [3, 4, 3]
Output: -1
Explanation: Total fuel is less than the total travel cost.
```

## Constraints

- 1 <= gas.length == cost.length <= 100,000
- 0 <= gas[i], cost[i] <= 10,000
- A valid starting index, when one exists, is unique.
