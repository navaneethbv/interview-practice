# Sum of Distances

For every index i, add the absolute index differences |i-j| over all indices j with nums[j] equal to nums[i].
Return the sums for all indices.

## Examples

### Example 1

```text
Input: nums = [1, 3, 1, 1, 2]
Output: [5, 0, 3, 4, 0]
Explanation: The three positions holding 1 are 0, 2, and 3.
```

### Example 2

```text
Input: nums = [4, 5, 6]
Output: [0, 0, 0]
Explanation: Every value occurs once.
```

## Constraints

- 1 <= nums.length <= 100000
- 0 <= nums[i] <= 1000000000
