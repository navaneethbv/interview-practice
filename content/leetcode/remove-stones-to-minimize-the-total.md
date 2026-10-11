# Remove Stones to Minimize the Total

`piles[i]` is the number of stones in pile `i`.
Exactly `k` times, choose any pile and remove `floor(piles[i] / 2)` stones from it; a pile can be chosen more than once.
Return the minimum possible total number of stones remaining.

## Constraints

- 1 <= piles.length <= 10^5
- 1 <= piles[i] <= 10^4
- 1 <= k <= 10^5

## Examples

### Example 1

```text
Input: piles = [5, 4, 9], k = 2
Output: 12
Explanation: Halving 9 then 5 leaves 3 + 4 + 5 = 12.
```

### Example 2

```text
Input: piles = [4, 3, 6, 7], k = 3
Output: 12
Explanation: Halve 7, then 6, then the resulting 4.
```
