# Maximum Number of Jumps to Reach the Last Index

Start at index 0.
You may jump from i to any later index j when |nums[j]-nums[i]| is at most target.
Return the largest number of jumps in a route ending at the last index, or -1 if it cannot be reached.

## Examples

### Example 1

```text
Input: nums = [1, 3, 6, 4, 1, 2], target = 2
Output: 3
Explanation: One route uses indices 0, 1, 3, 5.
```

### Example 2

```text
Input: nums = [1, 2, 3], target = 0
Output: -1
Explanation: No jump is allowed between distinct values.
```

## Constraints

- 2 <= nums.length <= 1000
- -1000000000 <= nums[i] <= 1000000000
- 0 <= target <= 2000000000
