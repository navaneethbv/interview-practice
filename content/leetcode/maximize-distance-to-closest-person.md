# Maximize Distance to Closest Person

Choose an empty seat, marked 0, in the row `seats`.
Occupied seats are marked 1.
Maximize the distance in indices to the nearest occupied seat and return that distance.

## Constraints

- `2 <= seats.length <= 20000`.
- There is at least one empty and one occupied seat.

## Examples

### Example 1

```text
Input: seats = [1, 0, 0, 0, 1]
Output: 2
Explanation: The middle empty seat is two places from either person.
```

### Example 2

```text
Input: seats = [0, 0, 1]
Output: 2
Explanation: The leftmost seat is two places away.
```
