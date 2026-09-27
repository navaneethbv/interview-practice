# Min Cost Climbing Stairs

Pay `cost[i]` when you use step i, then move up either one or two steps.
You may start on step 0 or step 1.
Return the minimum cost to reach the position just beyond the final step.

## Examples

### Example 1

```text
Input: cost = [4, 7, 2]
Output: 6
Explanation: Start on step 0, then use step 2, paying 4 + 2.
```

### Example 2

```text
Input: cost = [9, 3]
Output: 3
Explanation: Start on step 1 and leave the staircase.
```

## Constraints

- 2 <= cost.length <= 1,000
- 0 <= cost[i] <= 999
