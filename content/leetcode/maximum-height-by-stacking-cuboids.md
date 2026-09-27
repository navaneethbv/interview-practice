# Maximum Height by Stacking Cuboids

Each cuboid may be rotated so any dimension becomes its height.
Stack a subset of cuboids so each upper cuboid has width, length, and height no greater than those of the cuboid immediately below it.
Return the maximum total stack height.

## Examples

### Example 1

```text
Input: cuboids = [[1, 2, 3], [2, 3, 4]]
Output: 7
Explanation: Orient heights as 3 and 4 and place the smaller cuboid on top.
```

### Example 2

```text
Input: cuboids = [[5, 5, 5], [5, 5, 5]]
Output: 10
Explanation: Equal cuboids may be stacked.
```

## Constraints

- 1 <= cuboids.length <= 100
- Each cuboid has three integer dimensions from 1 through 100.
