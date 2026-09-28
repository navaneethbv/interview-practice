# Smaller Prefixes

`arr` has even length `n`.
Return `true` when, for every `k` from 1 to `n / 2`, the sum of the first `k` elements is strictly smaller than the sum of the first `2k` elements.
An empty array satisfies the condition.

## Examples

### Example 1

```text
Input: arr = [1, 2, 2, -1]
Output: true
Explanation: 1 < 3 and 3 < 4.
```

### Example 2

```text
Input: arr = [1, 2, -2, 1, 3, 5]
Output: false
Explanation: The first two elements sum to 3, but the first four sum to 2.
```

## Constraints

- `0 <= arr.length <= 10^6` and the length is even.
- `-10^9 <= arr[i] <= 10^9`
