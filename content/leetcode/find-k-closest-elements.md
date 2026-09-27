# Find K Closest Elements

From sorted array `arr`, choose the `k` entries closest to `x`.
Smaller values win ties in distance.
Return the chosen values in ascending order, preserving duplicate occurrences.

## Examples

### Example 1

```text
Input: arr = [1, 2, 3, 4, 5], k = 4, x = 3
Output: [1, 2, 3, 4]
Explanation: Values 1 and 5 tie for the final place; prefer 1.
```

### Example 2

```text
Input: arr = [1, 2, 3, 4, 5], k = 4, x = -1
Output: [1, 2, 3, 4]
Explanation: The four smallest values are nearest to -1.
```

## Constraints

- 1 <= k <= arr.length <= 10,000
- arr is sorted in nondecreasing order.
- -10,000 <= arr[i], x <= 10,000
