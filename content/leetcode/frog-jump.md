# Frog Jump

A frog starts at the first stone, at position 0, and must make its first jump of length 1.
After a jump of length k, its next forward jump may have length k-1, k, or k+1, but must be positive and land on a stone.
Return whether it can reach the final stone.

## Examples

### Example 1

```text
Input: stones = [0, 1, 3, 5, 6, 8, 12, 17]
Output: true
Explanation: Jump lengths 1, 2, 2, 3, 4, 5 reach the end.
```

### Example 2

```text
Input: stones = [0, 1, 2, 3, 4, 8, 9, 11]
Output: false
Explanation: The gap to 8 cannot be crossed from the reachable earlier states.
```

## Constraints

- 2 <= stones.length <= 2,000
- stones[0] == 0; positions are strictly increasing.
- 0 <= stones[i] <= 2^31 - 1
