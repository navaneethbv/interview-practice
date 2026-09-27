# Minimum Number of Groups to Create a Valid Assignment

Partition all indices into groups so every group contains equal array values.
The largest and smallest group sizes may differ by at most one.
Return the fewest groups satisfying both rules.

## Examples

### Example 1

```text
Input: balls = [3, 2, 3, 2, 3]
Output: 2
Explanation: Make one group of three 3s and one group of two 2s.
```

### Example 2

```text
Input: balls = [1, 1, 1, 1, 2]
Output: 3
Explanation: Split the four 1s into groups of two; the single 2 is the third group.
```

## Constraints

- 1 <= balls.length <= 100000.
- 1 <= balls[i] <= 1000000000.
