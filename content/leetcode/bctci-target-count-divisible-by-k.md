# Target Count Divisible By K

Given a sorted array `arr`, a `target`, and a positive integer `k`, return whether the number of occurrences of `target` in `arr` is a multiple of `k`.
Zero occurrences count as a multiple.

## Examples

### Example 1

```text
Input: arr = [1, 2, 2, 2, 2, 2, 2, 3], target = 2, k = 3
Output: true
```

### Example 2

```text
Input: arr = [1, 2, 2, 2, 2, 2, 2, 3], target = 2, k = 4
Output: false
```

## Constraints

- `1 <= arr.length <= 10^6`
- `-10^9 <= arr[i], target <= 10^9`
- `1 <= k <= 10^6`
