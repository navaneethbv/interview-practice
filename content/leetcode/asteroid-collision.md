# Asteroid Collision

Asteroids lie in the array order.
A positive value moves right and a negative value moves left, all at equal speed; absolute value is size.
When opposing asteroids collide, the smaller disappears, or both disappear if equal.
Return surviving asteroids in their original order.

## Examples

### Example 1

```text
Input: asteroids = [5, 10, -5]
Output: [5, 10]
Explanation: The size-5 left-moving asteroid is destroyed by size 10.
```

### Example 2

```text
Input: asteroids = [8, -8]
Output: []
Explanation: Equal sizes destroy each other.
```

## Constraints

- 2 <= asteroids.length <= 10,000
- -1,000 <= asteroids[i] <= 1,000; no value is zero.
