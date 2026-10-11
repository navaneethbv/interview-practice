# Minimum Absolute Difference

`arr` contains distinct integers.
Find the minimum absolute difference between any two elements, and return every pair `[a, b]` with `a < b` and `b - a` equal to that difference, in ascending order of `a`.

## Constraints

- 2 <= arr.length <= 10^5
- -10^6 <= arr[i] <= 10^6
- All elements are distinct.

## Examples

### Example 1

```text
Input: arr = [4, 2, 1, 3]
Output: [[1, 2], [2, 3], [3, 4]]
Explanation: Every adjacent pair differs by 1.
```

### Example 2

```text
Input: arr = [3, 8, -10, 23, 19, -4, -14, 27]
Output: [[-14, -10], [19, 23], [23, 27]]
Explanation: The smallest gap is 4, between -14 and -10, 19 and 23, and 23 and 27.
```
