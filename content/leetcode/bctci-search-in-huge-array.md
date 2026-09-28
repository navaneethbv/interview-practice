# Search In Huge Array

A sorted array of positive integers, possibly with duplicates, is too large to load and has no length API.
Read it through `reader.get(i)`, which returns the value at index `i` or a large sentinel past the end (`math.inf` in Python, `Integer.MAX_VALUE` in Java).
Return the smallest index holding `target`, or `-1` if it is absent, using as few reads as practical.

## Examples

### Example 1

```text
Input: reader = [1, 3, 5, 7, 9], target = 5
Output: 2
```

### Example 2

```text
Input: reader = [2, 4, 6, 8, 10], target = 1
Output: -1
```

## Constraints

- `0 <= array length <= 10^6`
- `1 <= array[i], target <= 10^9`
