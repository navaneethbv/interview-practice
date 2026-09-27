# Minimum Cost to Buy Apples II

Each bidirectional road is [u,v,cost,tax].
Traveling along it empty costs cost; traveling while carrying apples costs cost*tax.
For every starting shop, choose a shop to buy apples at its listed price and return to the start, or buy locally.
The outward and return routes may differ.
Return the minimum total cost for each start.

## Examples

### Example 1

```text
Input: n = 2, prices = [10, 2], roads = [[0, 1, 1, 2]]
Output: [5, 2]
Explanation: From shop 0, pay 1 outward, 2 for apples, and 2 returning.
```

### Example 2

```text
Input: n = 2, prices = [7, 3], roads = []
Output: [7, 3]
Explanation: Without roads, each shop must buy locally.
```

## Constraints

- 1 <= n <= 1000; prices.length == n
- 1 <= prices[i], road cost <= 1000000000
- 0 <= roads.length <= min(n*(n-1)/2, 2000)
- Road endpoints are distinct indices from 0 through n-1; no road pair is repeated.
- 1 <= tax <= 100
