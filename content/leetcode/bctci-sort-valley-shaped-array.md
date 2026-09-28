# Sort Valley-Shaped Array

A valley-shaped array can be split into a non-empty prefix sorted in non-increasing order and a non-empty suffix sorted in non-decreasing order.
Given a valley-shaped array (an empty array also counts), return a new array with its elements sorted in ascending order in linear time.

## Examples

### Example 1

```text
Input: arr = [8, 4, 2, 6]
Output: [2, 4, 6, 8]
```

### Example 2

```text
Input: arr = [2, 2, 1, 1]
Output: [1, 1, 2, 2]
```

## Constraints

- `0 <= arr.length <= 10^6`
- `-10^9 <= arr[i] <= 10^9`
