# Find Maximum Value in a Constrained Sequence

Choose n nonnegative values with a[0] = 0.
Consecutive values may differ by at most diff[i], and each [index,cap] restriction requires a[index] <= cap.
Return the largest value that can appear anywhere in a valid sequence.

## Examples

### Example 1

```text
Input: n = 4, restrictions = [[2, 1]], diff = [3, 3, 3]
Output: 4
Explanation: The sequence [0,3,1,4] is valid and reaches 4.
```

### Example 2

```text
Input: n = 3, restrictions = [[2, 1]], diff = [1, 1]
Output: 1
Explanation: Both positions after the fixed zero are bounded by 1.
```

## Constraints

- 2 <= n <= 100000
- 1 <= restrictions.length < n; restricted indices are distinct and lie between 1 and n-1.
- 1 <= cap <= 1000000
- diff.length == n-1; 1 <= diff[i] <= 10
