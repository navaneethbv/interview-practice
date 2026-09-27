# Minimum Deletions to Make Array Divisible

Delete any number of entries from nums so its smallest remaining value divides every entry of numsDivide.
Return the fewest deletions required, or -1 if no value in nums can serve as that divisor.

## Examples

### Example 1

```text
Input: nums = [2, 3, 2, 4, 3], numsDivide = [9, 6, 9, 3, 15]
Output: 2
Explanation: Delete both 2s; the smallest remaining value 3 divides every target.
```

### Example 2

```text
Input: nums = [4, 3, 6], numsDivide = [8, 2, 6, 10]
Output: -1
Explanation: No value in nums divides every target.
```

## Constraints

- 1 <= nums.length, numsDivide.length <= 100000
- 1 <= nums[i], numsDivide[i] <= 1000000000
