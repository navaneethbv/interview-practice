# Factor Combinations

Return all distinct ways to express n as a product of at least two integers greater than 1.
Every factor must be smaller than n.
Return factors within each combination in nondecreasing order; combination order is unrestricted.

## Constraints

- `1 <= n <= 10000000`.

## Examples

### Example 1

```text
Input: n = 12
Output: [[2, 6], [2, 2, 3], [3, 4]]
Explanation: These are the three multiplicative partitions of 12.
```

### Example 2

```text
Input: n = 13
Output: []
Explanation: A prime has no valid factorization.
```
