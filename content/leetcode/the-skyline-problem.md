# The Skyline Problem

Each building is [left,right,height], covering the horizontal interval from left up to right.
Return the outer skyline as sorted key points [x,newHeight] where the visible maximum height changes.
Include the final drop to height 0, avoid redundant points of equal consecutive height, and keep only one point per x coordinate.

## Examples

### Example 1

```text
Input: buildings = [[1, 3, 2], [2, 4, 3]]
Output: [[1, 2], [2, 3], [4, 0]]
Explanation: The taller second building takes over at x=2.
```

### Example 2

```text
Input: buildings = [[0, 2, 3], [2, 5, 3]]
Output: [[0, 3], [5, 0]]
Explanation: Touching equal-height buildings form one flat roof.
```

## Constraints

- 1 <= buildings.length <= 10,000
- 0 <= left < right <= 2^31 - 1
- 1 <= height <= 2^31 - 1
- Buildings are sorted by left coordinate.
