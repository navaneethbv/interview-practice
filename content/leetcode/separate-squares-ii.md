# Separate Squares II

Each square is `[x, y, side]`, with axis-aligned edges and bottom-left corner x,y.
Find the smallest horizontal line height dividing the union of all squares into equal areas above and below.
An overlapping region counts only once, regardless of how many squares cover it.

## Examples

### Example 1

```text
Input: squares = [[0, 0, 2], [0, 0, 2], [0, 2, 1]]
Output: 1.25
Explanation: The duplicated square contributes area 4 once, and the upper square adds area 1.
```

### Example 2

```text
Input: squares = [[0, 0, 1], [0, 3, 1]]
Output: 1.0
Explanation: Every line in the gap splits the area equally; return the lowest such height.
```

## Constraints

- 1 <= squares.length <= 50000.
- 0 <= x, y <= 1000000000.
- 1 <= side <= 1000000000.
- Answers within the judge floating-point tolerance are accepted.
