# Flood Fill

Recolor the starting pixel and every pixel connected to it through edge-adjacent pixels of the same original color.
Return the resulting image.

## Examples

### Example 1

```text
Input: image = [[1, 1], [1, 0]], sr = 0, sc = 0, color = 2
Output: [[2, 2], [2, 0]]
Explanation: The three connected pixels with color 1 are recolored.
```

### Example 2

```text
Input: image = [[1, 0], [0, 1]], sr = 0, sc = 0, color = 3
Output: [[3, 0], [0, 1]]
Explanation: Diagonal contact does not connect the other 1.
```

## Constraints

- 1 <= image.length, image[i].length <= 50
- The image is rectangular; sr and sc identify a valid pixel.
- 0 <= image[i][j], color < 2^16
