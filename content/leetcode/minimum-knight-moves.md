# Minimum Knight Moves

A chess knight starts at (0,0) on an infinite board.
Each move changes one coordinate by 2 and the other by 1, with either sign.
Return the fewest moves needed to reach (x,y).

## Examples

### Example 1

```text
Input: x = 2, y = 1
Output: 1
Explanation: The target is one knight move away.
```

### Example 2

```text
Input: x = 1, y = 0
Output: 3
Explanation: A route is (0,0), (2,1), (3,-1), (1,0).
```

## Constraints

- -300 <= x, y <= 300
- |x| + |y| <= 300
