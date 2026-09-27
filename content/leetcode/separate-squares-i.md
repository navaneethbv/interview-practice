# Separate Squares I

Each square is `[x, y, side]`, with bottom-left corner x,y and edges parallel to the axes.
Find the smallest horizontal line height that divides the total counted area into equal amounts above and below.
Overlapping area is counted once for every square covering it.

## Examples

### Example 1

```text
Input: squares = [[0, 0, 2], [3, 2, 2]]
Output: 2.0
Explanation: The line at height 2 leaves one full square on each side.
```

### Example 2

```text
Input: squares = [[0, 0, 2], [1, 1, 2]]
Output: 1.5
Explanation: Counting overlap separately, the line splits the combined area of 8 equally.
```

## Constraints

- 1 <= squares.length <= 50000.
- 0 <= x, y <= 1000000000.
- 1 <= side <= 1000000000.
- Answers within the judge floating-point tolerance are accepted.
