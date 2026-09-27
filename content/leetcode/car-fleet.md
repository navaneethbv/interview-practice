# Car Fleet

Cars travel toward the same target along a one-lane road.
A faster car cannot pass a slower car ahead; on catching it, they continue together at the slower speed.
Cars that meet exactly at the target belong to the same fleet.
Return the number of fleets that arrive at the target.

## Examples

### Example 1

```text
Input: target = 10, position = [0, 4, 8], speed = [2, 2, 1]
Output: 3
Explanation: Their arrival times are 5, 3, and 2; no car catches the one ahead.
```

### Example 2

```text
Input: target = 10, position = [0, 5], speed = [2, 1]
Output: 1
Explanation: Both cars reach the target at time 5, so they form one fleet.
```

## Constraints

- 1 <= position.length == speed.length <= 100000.
- 0 < target <= 1000000.
- Positions are distinct, and 0 <= position[i] < target.
- 1 <= speed[i] <= 1000000.
