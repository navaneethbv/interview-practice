# Buildings With an Ocean View

The ocean lies to the right of all buildings.
A building has an ocean view only if every building to its right is strictly shorter.
Return the visible building indices in increasing order.

## Examples

### Example 1

```text
Input: heights = [4, 2, 3, 1]
Output: [0, 2, 3]
Explanation: Buildings 0, 2, and 3 have no equally tall or taller building to their right.
```

### Example 2

```text
Input: heights = [2, 2, 2]
Output: [2]
Explanation: Equal heights block earlier buildings.
```

## Constraints

- 1 <= heights.length <= 100,000
- 1 <= heights[i] <= 10^9
