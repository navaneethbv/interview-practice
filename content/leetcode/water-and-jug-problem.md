# Water and Jug Problem

You have jugs with capacities `x` and `y`, initially empty.
You may fill either jug, empty either jug, or pour between them until the source empties or the destination fills.
Return whether exactly `target` units can be held across the two jugs.

## Constraints

- `1 <= x, y <= 1000000`.
- `0 <= target <= 2000000`.

## Examples

### Example 1

```text
Input: x = 3, y = 5, target = 4
Output: true
Explanation: Repeated filling and pouring can leave four units.
```

### Example 2

```text
Input: x = 2, y = 6, target = 5
Output: false
Explanation: Every reachable volume is even.
```
