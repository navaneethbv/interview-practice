# Find the Number of Distinct Colors Among the Balls

Balls numbered 0 through limit initially have no color.
For each query `[ball,color]`, assign that color to the ball, replacing any old color.
Return the number of distinct colors currently used after each query.
Uncolored balls do not contribute.

## Constraints

- `1 <= limit <= 1000000000`.
- There are 1 to 100000 valid queries.
- Colors are integers from 1 to 1000000000.

## Examples

### Example 1

```text
Input: limit = 3, queries = [[0, 1], [1, 2], [0, 2]]
Output: [1, 2, 1]
Explanation: Recoloring ball 0 removes the last occurrence of color 1.
```

### Example 2

```text
Input: limit = 1, queries = [[0, 5], [0, 5]]
Output: [1, 1]
Explanation: Reassigning the same color does not change the count.
```
