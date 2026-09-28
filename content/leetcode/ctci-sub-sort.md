# Sub Sort

Find indices `m` and `n` such that sorting only `array[m..n]` makes the whole array sorted in non-decreasing order.
Minimize `n - m` and return `[m, n]`.
Return `[-1, -1]` when the array is already sorted.

## Examples

### Example 1

```text
Input: array = [1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19]
Output: [3, 9]
```

### Example 2

```text
Input: array = [1, 2, 2, 3]
Output: [-1, -1]
```

## Constraints

- `0 <= array.length <= 100,000`
- `-10^9 <= array[i] <= 10^9`
