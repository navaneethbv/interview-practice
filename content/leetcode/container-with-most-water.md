# Container With Most Water

At each index stands a vertical line of the given height.
Choose two lines and the horizontal axis to form a container.
Its capacity is the distance between the indices multiplied by the shorter height.
Return the largest possible capacity; the container cannot be tilted.

## Examples

### Example 1

```text
Input: height = [3, 1, 4, 2, 5]
Output: 12
Explanation: Indices 0 and 4 provide width 4 and limiting height 3.
```

### Example 2

```text
Input: height = [2, 2]
Output: 2
Explanation: The only pair has width 1.
```

## Constraints

- 2 <= height.length <= 100,000
- 0 <= height[i] <= 10,000
