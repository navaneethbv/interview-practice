# Partition Array for Maximum Sum

Split `arr` into contiguous blocks of length at most k.
Replace every entry in each block with that block's maximum value.
Return the greatest possible total after replacement.

## Examples

### Example 1

```text
Input: arr = [1, 15, 7, 9, 2, 5, 10], k = 3
Output: 84
Explanation: Use blocks [1,15,7], [9], and [2,5,10].
```

### Example 2

```text
Input: arr = [1, 2, 3], k = 1
Output: 6
Explanation: Length-one blocks leave every entry unchanged.
```

## Constraints

- 1 <= arr.length <= 500
- 0 <= arr[i] <= 10^9
- 1 <= k <= arr.length
- The answer fits a signed 32-bit integer.
