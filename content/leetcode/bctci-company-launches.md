# Company Launches

Company i launched on day `launches[i]` with advertising spend `ads[i]`.
It is overshadowed by a company that launched strictly earlier and spent strictly more.
Return the original indices of companies overshadowed by exactly one other company, in ascending order.

## Constraints

- The arrays have equal length, possibly zero.
- Launch days are distinct integers from 1 through 366, so at most 366 companies are possible.
- Ad spends are distinct integers from 1 through 1,000,000,000.


## Examples

### Example 1

```text
Input: [[3, 1, 2], [4, 5, 3]]
Output: [0, 2]
```

### Example 2

```text
Input: [[1, 2, 3], [1, 2, 3]]
Output: []
```
