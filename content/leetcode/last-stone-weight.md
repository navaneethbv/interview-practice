# Last Stone Weight

Repeatedly smash the two heaviest stones together.
If their weights are equal, both disappear; otherwise the heavier stone is replaced by their positive difference.
Return the final stone's weight, or 0 if no stones remain.

## Examples

### Example 1

```text
Input: stones = [2, 5, 9]
Output: 2
Explanation: Smash 9 and 5 into 4, then 4 and 2 into 2.
```

### Example 2

```text
Input: stones = [4, 4]
Output: 0
Explanation: Equal stones destroy each other.
```

## Constraints

- 1 <= stones.length <= 30.
- 1 <= stones[i] <= 1000.
