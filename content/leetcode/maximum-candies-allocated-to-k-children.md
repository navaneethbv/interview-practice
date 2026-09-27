# Maximum Candies Allocated to K Children

You may split each candy pile into smaller piles but cannot combine separate piles.
Give each of k children one pile of the same positive size.
Return the largest possible per-child size, or 0 if not every child can receive candy.

## Examples

### Example 1

```text
Input: candies = [5, 8, 6], k = 3
Output: 5
Explanation: The piles can supply three groups of five.
```

### Example 2

```text
Input: candies = [2, 5], k = 11
Output: 0
Explanation: There are fewer candies than children.
```

## Constraints

- 1 <= candies.length <= 100,000
- 1 <= candies[i] <= 10^7
- 1 <= k <= 10^12
