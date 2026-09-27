# Falling Squares

Drop squares one at a time onto the x-axis.
Each `[left,side]` square falls vertically until it contacts the ground or the top of an earlier square with positive-width horizontal overlap.
Touching only at an edge does not provide support.
Return the maximum height after each drop.

## Constraints

- There are 1 to 1000 squares.
- Left coordinates are positive and at most 100000000; side lengths are at most 1000000.

## Examples

### Example 1

```text
Input: positions = [[1, 2], [2, 3], [6, 1]]
Output: [2, 5, 5]
Explanation: The second square lands on the first; the third lands on the ground.
```

### Example 2

```text
Input: positions = [[1, 2], [3, 2]]
Output: [2, 2]
Explanation: The squares touch only at an edge.
```
