# Perfect Rectangle

Each rectangle is `[left, bottom, right, top]` with positive width and height.
Return whether these rectangles cover one larger rectangle exactly, with no overlap of positive area and no gaps.

## Examples

### Example 1

```text
Input: rectangles = [[0, 0, 1, 1], [1, 0, 2, 1]]
Output: true
Explanation: Two adjacent unit rectangles exactly form a 2 by 1 rectangle.
```

### Example 2

```text
Input: rectangles = [[0, 0, 1, 1], [2, 0, 3, 1]]
Output: false
Explanation: There is an uncovered gap between the pieces.
```

## Constraints

- 1 <= rectangles.length <= 20000.
- Coordinates are integers between -100000 and 100000.
