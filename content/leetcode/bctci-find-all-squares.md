# Find All Squares

`arr` holds distinct positive integers.
Return every pair of indices `[i, j]` with `arr[i] * arr[i] == arr[j]`, in any order.
A value of 1 pairs with itself.

## Examples

### Example 1

```text
Input: arr = [4, 10, 3, 100, 5, 2, 10000]
Output: [[5, 0], [1, 3], [3, 6]]
```

### Example 2

```text
Input: arr = [1]
Output: [[0, 0]]
```

## Constraints

- `0 <= arr.length <= 10^6`
- `1 <= arr[i] <= 10^9`
