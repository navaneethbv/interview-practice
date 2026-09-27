# Lexicographically Smallest Negated Permutation That Sums to Target

Use each magnitude 1 through n once, assigning each either a positive or negative sign, and arrange the signed values into an array summing to target.
Return the lexicographically smallest possible array, or an empty array if no arrangement can meet the sum.

## Examples

### Example 1

```text
Input: n = 4, target = 0
Output: [-4, -1, 2, 3]
Explanation: Negating 4 and 1 changes the total 10 into 0; sorted order is lexicographically smallest.
```

### Example 2

```text
Input: n = 2, target = 0
Output: []
Explanation: The total magnitude 3 cannot be reduced to 0 by flipping signs.
```

## Constraints

- 1 <= n <= 100000.
- -10000000000 <= target <= 10000000000.
