# Russian Doll Envelopes

Each envelope is [width,height].
One envelope fits inside another only when both dimensions are strictly smaller, and rotation is not allowed.
Return the longest chain of nested envelopes.

## Examples

### Example 1

```text
Input: envelopes = [[5, 4], [6, 4], [6, 7], [2, 3]]
Output: 3
Explanation: Nest [2,3] inside [5,4] inside [6,7].
```

### Example 2

```text
Input: envelopes = [[1, 1], [1, 1], [1, 1]]
Output: 1
Explanation: Equal dimensions cannot nest.
```

## Constraints

- 1 <= envelopes.length <= 100,000
- 1 <= width, height <= 100,000
