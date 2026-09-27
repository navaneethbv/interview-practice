# Minimum Cost to Make Array Equal

Changing nums[i] by one in either direction costs cost[i].
Return the smallest total cost to make every array entry equal to one integer.

## Examples

### Example 1

```text
Input: nums = [1, 3, 5, 2], cost = [2, 3, 1, 14]
Output: 8
Explanation: Make all entries equal to 2; the costs are 2, 3, 3, and 0.
```

### Example 2

```text
Input: nums = [2, 2], cost = [1, 100]
Output: 0
Explanation: The entries are already equal.
```

## Constraints

- 1 <= nums.length == cost.length <= 100,000
- 1 <= nums[i], cost[i] <= 10^6
