# Sorted Search, No Size

A sorted array of distinct positive integers is hidden behind an `ArrayReader`, and its length is not available.
`reader.get(i)` returns the element at index `i`, or a very large sentinel value when `i` is past the end.
In Python the sentinel is `math.inf`; in Java it is `Integer.MAX_VALUE`.

Return the index of `target`, or `-1` if it is absent.

## Examples

### Example 1

```text
Input: reader = [1, 3, 5, 8, 13, 21], target = 8
Output: 3
```

### Example 2

```text
Input: reader = [2, 4], target = 3
Output: -1
```

## Constraints

- `0 <= array length <= 100,000`
- `1 <= array[i], target <= 10^9`
- Values are distinct and sorted in increasing order.
