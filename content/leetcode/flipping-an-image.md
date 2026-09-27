# Flipping an Image

Reverse each row of the binary image horizontally, then change every zero to one and every one to zero.
Return the resulting image.

## Constraints

- The image is square with size 1 to 20.
- All values are 0 or 1.

## Examples

### Example 1

```text
Input: image = [[1, 0], [0, 0]]
Output: [[1, 0], [1, 1]]
Explanation: Rows reverse before their bits are inverted.
```

### Example 2

```text
Input: image = [[0]]
Output: [[1]]
Explanation: The single bit is inverted.
```
