# Tunnel Depth

The square binary matrix `tunnel_network` describes excavated cells with 1 and solid ground with 0.
All excavated cells form one connected component using shared sides, and both top corners are excavated.
Row 0 is at ground depth 0.
Return the greatest row index that contains an excavated cell.

## Constraints

- 1 <= n <= 10,000; the matrix has n rows and n columns.
- Every cell is 0 or 1.
- Seek a solution that examines fewer than n squared cells in the worst case.


## Examples

### Example 1

```text
Input: [[[1, 1, 1], [0, 1, 0], [0, 0, 0]]]
Output: 1
```

### Example 2

```text
Input: [[[1]]]
Output: 0
```
