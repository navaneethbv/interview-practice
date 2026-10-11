# Maximum Number of Visible Points

You stand at `location` and can rotate to face any direction.
Your field of view covers `angle` degrees, inclusive at both edges.
Return the maximum number of `points` you can see at once.
Points at your own location are always visible, and points do not block each other.

## Constraints

- 1 <= points.length <= 10^5
- 0 <= angle < 360
- 0 <= coordinates <= 100

## Examples

### Example 1

```text
Input: points = [[2, 1], [2, 2], [3, 3]], angle = 90, location = [1, 1]
Output: 3
Explanation: All three points fit inside a 90 degree view.
```

### Example 2

```text
Input: points = [[1, 0], [2, 1]], angle = 13, location = [1, 1]
Output: 1
Explanation: The two points are 90 degrees apart, so only one fits.
```
