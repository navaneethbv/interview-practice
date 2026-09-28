# Largest Temperature Change

For every consecutive block of `k` temperatures, subtract its minimum from its maximum.
Return the largest of those differences.

## Constraints

- 2 <= temperatures.length <= 100,000.
- Each temperature is between -100 and 100.
- 2 <= k <= temperatures.length.


## Examples

### Example 1

```text
Input: [[3, 1, 6, 2], 2]
Output: 5
```

### Example 2

```text
Input: [[-4, -1], 2]
Output: 3
```
