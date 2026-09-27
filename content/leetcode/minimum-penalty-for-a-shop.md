# Minimum Penalty for a Shop

At hour i, Y means customers arrive and N means nobody arrives.
If you close at hour j, the shop is open for hours before j and closed from j onward.
Each open hour without customers and each closed hour with customers adds one penalty point.
Return the earliest closing hour with the smallest penalty.

## Examples

### Example 1

```text
Input: customers = "YYNY"
Output: 2
Explanation: Closing at 2 and 4 both have penalty one; choose the earlier hour.
```

### Example 2

```text
Input: customers = "NNN"
Output: 0
Explanation: Remaining closed avoids all penalty.
```

## Constraints

- 1 <= customers.length <= 100000.
- customers contains only Y and N.
- Closing hours range from 0 through customers.length.
