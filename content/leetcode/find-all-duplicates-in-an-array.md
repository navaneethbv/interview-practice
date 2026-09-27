# Find All Duplicates in an Array

An array of length n contains values from 1 through n, each occurring once or twice.
Return all values occurring twice, in any order.
Use linear time and constant auxiliary space besides the output; modifying the input is allowed.

## Examples

### Example 1

```text
Input: nums = [4, 3, 2, 7, 8, 2, 3, 1]
Output: [2, 3]
Explanation: Only 2 and 3 have second occurrences.
```

### Example 2

```text
Input: nums = [1, 1, 2]
Output: [1]
Explanation: The duplicate value is 1.
```

## Constraints

- 1 <= nums.length <= 100,000
- 1 <= nums[i] <= nums.length
- Every value occurs at most twice.
