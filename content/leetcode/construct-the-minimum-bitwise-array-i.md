# Construct the Minimum Bitwise Array I

For each prime value p in nums, find the smallest nonnegative integer a satisfying `a OR (a + 1) == p`, where OR is bitwise.
Return -1 for an entry with no solution.

## Examples

### Example 1

```text
Input: nums = [11, 17]
Output: [9, 16]
Explanation: 9 OR 10 is 11, and 16 OR 17 is 17; these are the smallest solutions.
```

### Example 2

```text
Input: nums = [2, 31]
Output: [-1, 15]
Explanation: No consecutive pair has bitwise OR 2; 15 OR 16 is 31.
```

## Constraints

- 1 <= nums.length <= 100.
- Each nums[i] is prime and 2 <= nums[i] <= 1000.
