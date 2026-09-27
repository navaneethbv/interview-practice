# Paint House

Paint a row of houses using three colors so adjacent houses have different colors.
The three entries of costs[i] give the cost of painting house i each color.
Return the smallest total cost.

## Examples

### Example 1

```text
Input: costs = [[17, 2, 17], [16, 16, 5], [14, 3, 19]]
Output: 10
Explanation: Use colors with costs 2,5,3.
```

### Example 2

```text
Input: costs = [[7, 6, 2]]
Output: 2
Explanation: Choose the cheapest color for the only house.
```

## Constraints

- 1 <= costs.length <= 100.
- Each row has three costs between 1 and 20.
