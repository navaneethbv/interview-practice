# Rearranging Fruits

Two equally sized baskets hold fruits whose values are listed.
A move swaps one fruit from each basket and costs the smaller of their values.
Return the minimum cost to make the two baskets contain identical multisets, or -1 if impossible.

## Examples

### Example 1

```text
Input: basket1 = [4, 2, 2, 2], basket2 = [1, 4, 1, 2]
Output: 1
Explanation: Swap a 2 in the first basket with a 1 in the second.
```

### Example 2

```text
Input: basket1 = [1, 2], basket2 = [1, 3]
Output: -1
Explanation: The combined counts of 2 and 3 are odd.
```

## Constraints

- 1 <= basket1.length == basket2.length <= 100000
- 1 <= basket1[i], basket2[i] <= 1000000000
