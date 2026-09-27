# Detonate the Maximum Bombs

Each bomb is [x,y,radius].
Detonating a bomb triggers every bomb whose center lies within or on its circular blast area, allowing further chain reactions.
Choose one starting bomb and return the largest number that can detonate.

## Examples

### Example 1

```text
Input: bombs = [[1, 1, 2], [3, 1, 1], [8, 1, 1]]
Output: 2
Explanation: The first bomb triggers the second; the third is out of reach.
```

### Example 2

```text
Input: bombs = [[1, 1, 1]]
Output: 1
Explanation: Detonate the only bomb.
```

## Constraints

- 1 <= bombs.length <= 100
- 1 <= x, y, radius <= 100000
