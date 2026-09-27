# Car Fleet II

Cars travel rightward along one lane without passing.
Each [position,speed] pair describes a car, and positions are strictly increasing.
When cars meet they form a fleet moving at the slower speed.
Return, for each original car, the first time it meets a car ahead, or -1 if it never does.

## Examples

### Example 1

```text
Input: cars = [[1, 2], [2, 1], [4, 3], [7, 2]]
Output: [1, -1, 3, -1]
Explanation: The first car reaches the second after one second, and the third reaches the fourth after three.
```

### Example 2

```text
Input: cars = [[1, 1], [3, 2]]
Output: [-1, -1]
Explanation: The car ahead is faster and never gets caught.
```

## Constraints

- 1 <= cars.length <= 100000
- 1 <= position, speed <= 1000000
- Positions are strictly increasing.
