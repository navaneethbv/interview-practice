# Stack of Boxes

Each box is `[width, height, depth]` and cannot be rotated.
A box can be placed on top of another only when it is strictly smaller in all three dimensions.
Build a stack from any subset of the boxes and return the greatest possible total height.

## Examples

### Example 1

```text
Input: boxes = [[1, 2, 3], [2, 3, 4], [3, 1, 5]]
Output: 5
Explanation: Stack [1, 2, 3] on [2, 3, 4].
```

### Example 2

```text
Input: boxes = [[2, 2, 2], [2, 2, 2]]
Output: 2
Explanation: Equal boxes cannot be stacked.
```

## Constraints

- `0 <= boxes.length <= 1,000`
- `1 <= width, height, depth <= 10,000`
