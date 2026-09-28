# Compress Array By K

A k-compress step finds the first block of `k` adjacent equal numbers and replaces the block with their sum.
Apply k-compress steps until no block of `k` adjacent equal numbers remains, and return the final array.

## Examples

### Example 1

```text
Input: arr = [1, 9, 9, 3, 3, 3, 4], k = 3
Output: [1, 27, 4]
```

### Example 2

```text
Input: arr = [4, 4, 4, 4], k = 5
Output: [4, 4, 4, 4]
```

## Constraints

- `0 <= arr.length <= 10^5`
- `0 <= arr[i] < 1,000` and `2 <= k <= 10^5`
- The result fits in a signed 64-bit integer.
