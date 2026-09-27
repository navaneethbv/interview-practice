# Longest Balanced Subarray I

A contiguous subarray is balanced when its number of distinct even values equals its number of distinct odd values.
Repeated occurrences of a value count only once.
Return the largest balanced subarray length, or 0 if none exists.

## Examples

### Example 1

```text
Input: nums = [2, 2, 1, 3, 4]
Output: 5
Explanation: The distinct evens are 2 and 4, and the distinct odds are 1 and 3.
```

### Example 2

```text
Input: nums = [2, 4, 6]
Output: 0
Explanation: Every nonempty subarray contains only even values.
```

## Constraints

- 1 <= nums.length <= 1500
- 1 <= nums[i] <= 100000
