# Largest Number

Arrange all nonnegative integers in `nums` so their decimal strings concatenate into the largest possible number.
Return the result as a string.
If every entry is zero, return a single 0.

## Examples

### Example 1

```text
Input: nums = [10, 2]
Output: "210"
Explanation: Putting 2 before 10 gives the larger concatenation.
```

### Example 2

```text
Input: nums = [3, 30, 34, 5, 9]
Output: "9534330"
Explanation: This ordering maximizes the combined decimal string.
```

## Constraints

- 1 <= nums.length <= 100
- 0 <= nums[i] <= 10^9
