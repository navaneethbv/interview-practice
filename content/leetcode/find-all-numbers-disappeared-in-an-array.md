# Find All Numbers Disappeared in an Array

An array of length n contains integers from 1 through n, possibly repeated.
Return all numbers in that range that do not occur, in any order.
Aim for linear time and constant auxiliary space besides the output.

## Examples

### Example 1

```text
Input: nums = [4, 3, 2, 7, 8, 2, 3, 1]
Output: [5, 6]
Explanation: Only 5 and 6 are missing from 1 through 8.
```

### Example 2

```text
Input: nums = [1, 1]
Output: [2]
Explanation: The second value in the range is absent.
```

## Constraints

- 1 <= nums.length <= 100,000
- 1 <= nums[i] <= nums.length
