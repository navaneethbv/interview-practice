# Stock Price Fluctuation

Price records arrive out of order, and a later record for the same timestamp corrects an earlier one.
`update(timestamp, price)` sets the price at `timestamp`.
`current()` returns the price at the latest timestamp seen.
`maximum()` and `minimum()` return the highest and lowest prices among the current records.

Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- Queries are only made after at least one update.
- 1 <= timestamp, price <= 10^9

## Examples

### Example 1

```text
Input: ops = ["update", "update", "current", "maximum", "update", "maximum", "update", "minimum"], args = [[1, 10], [2, 5], [], [], [1, 3], [], [4, 2], []]
Output: [null, null, 5, 10, null, 5, null, 2]
Explanation: Correcting timestamp 1 from 10 to 3 removes 10 from the records.
```

### Example 2

```text
Input: ops = ["update", "update", "current"], args = [[5, 7], [3, 9], []]
Output: [null, null, 7]
Explanation: The latest timestamp, not the latest update, is current.
```
