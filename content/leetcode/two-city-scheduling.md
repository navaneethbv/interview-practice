# Two City Scheduling

There are 2n people; costs[i] contains the travel costs to cities A and B.
Send exactly n people to each city and return the smallest total cost.

## Examples

### Example 1

```text
Input: costs = [[10, 20], [30, 200], [400, 50], [30, 20]]
Output: 110
Explanation: Send the first two people to A and the other two to B.
```

### Example 2

```text
Input: costs = [[5, 5], [7, 7]]
Output: 12
Explanation: Either balanced assignment costs 12.
```

## Constraints

- 2 <= costs.length <= 200 and the length is even.
- 1 <= costs[i][0], costs[i][1] <= 1,000
