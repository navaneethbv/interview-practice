# Identify the Largest Outlier in an Array

The array has n-2 special entries, one entry equal to their sum, and one outlier.
These roles use different indices, though their values may coincide.
Return the largest value that can be the outlier under some valid assignment of roles.

## Examples

### Example 1

```text
Input: nums = [1, 4, 5, 20]
Output: 20
Explanation: The special entries 1 and 4 sum to 5, leaving 20.
```

### Example 2

```text
Input: nums = [2, 2, 2]
Output: 2
Explanation: One 2 is special, another is its sum, and the third is the outlier.
```

## Constraints

- 3 <= nums.length <= 100000
- -1000 <= nums[i] <= 1000
- At least one valid outlier exists.
