# IPO

You may complete at most k distinct projects.
Project i requires current capital at least capital[i] and then increases capital by profits[i], without consuming the required capital.
Starting with w, return the greatest final capital.

## Examples

### Example 1

```text
Input: k = 2, w = 0, profits = [1, 2, 3], capital = [0, 1, 1]
Output: 4
Explanation: Complete the first project, then the third.
```

### Example 2

```text
Input: k = 1, w = 0, profits = [5], capital = [1]
Output: 0
Explanation: The only project is initially unaffordable.
```

## Constraints

- 1 <= k <= 100,000
- 0 <= w <= 10^9
- 1 <= profits.length == capital.length <= 100,000
- 0 <= profits[i] <= 10,000; 0 <= capital[i] <= 10^9
- The result fits a signed 32-bit integer.
