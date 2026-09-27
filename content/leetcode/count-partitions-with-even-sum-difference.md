# Count Partitions With Even Sum Difference

Choose a cut between two adjacent entries, producing a nonempty prefix and a nonempty suffix.
Count cuts for which the difference between the two sums is even.

## Examples

### Example 1

```text
Input: nums = [1, 2, 3]
Output: 2
Explanation: Both cuts have even differences because the total is even.
```

### Example 2

```text
Input: nums = [1, 2]
Output: 0
Explanation: The only cut has an odd difference.
```

## Constraints

- 2 <= nums.length <= 100.
- 1 <= nums[i] <= 100.
