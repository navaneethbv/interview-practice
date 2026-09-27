# Transformed Array

Treat nums as circular.
For each index i, move nums[i] positions from i, moving right for a positive value and left for a negative value.
Set the result at i to the original value where you land; zero leaves you at the same index.
Compute all entries independently from the original array.

## Examples

### Example 1

```text
Input: nums = [1, 2, 0]
Output: [2, 1, 0]
Explanation: Index 0 lands on 1, index 1 wraps to 0, and index 2 stays still.
```

### Example 2

```text
Input: nums = [-1, 2, 3]
Output: [3, -1, 3]
Explanation: Movement wraps around both ends.
```

## Constraints

- 1 <= nums.length <= 100
- -100 <= nums[i] <= 100
