# Majority Element

Return the value occurring more than half the time in `nums`.
Such a value is guaranteed to exist.
Aim for linear time and constant auxiliary space.

## Examples

### Example 1

```text
Input: nums = [3, 2, 3]
Output: 3
Explanation: The value 3 occupies two of the three positions.
```

### Example 2

```text
Input: nums = [2, 2, 1, 1, 1, 2, 2]
Output: 2
Explanation: Four of the seven entries are 2.
```

## Constraints

- 1 <= nums.length <= 50,000
- -10^9 <= nums[i] <= 10^9
- One value occurs more than nums.length / 2 times.
