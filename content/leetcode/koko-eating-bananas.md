# Koko Eating Bananas

Choose a positive integer eating speed k.
During each hour, Koko selects one nonempty pile and eats up to k bananas from it; any unused capacity that hour is lost.
Return the smallest k that lets her finish all piles within h hours.

## Examples

### Example 1

```text
Input: piles = [4, 8, 12], h = 6
Output: 4
Explanation: At speed 4, the piles take 1, 2, and 3 hours.
```

### Example 2

```text
Input: piles = [9], h = 2
Output: 5
Explanation: Two hours at speed 4 are insufficient; speed 5 finishes.
```

## Constraints

- 1 <= piles.length <= 10000.
- 1 <= piles[i] <= 1000000000.
- piles.length <= h <= 1000000000.
