# Jump Game

You start at index 0.
The value `nums[i]` is the maximum number of positions you may jump forward from index `i`.
Return whether some sequence of jumps can reach the final index.
You may choose a shorter jump than the maximum.

## Examples

### Example 1

```text
Input: nums = [2, 0, 2, 0, 1]
Output: true
Explanation: Jump from index 0 to index 2, then to index 4.
```

### Example 2

```text
Input: nums = [1, 0, 2]
Output: false
Explanation: The only first jump lands on a zero before the end.
```

## Constraints

- 1 <= nums.length <= 10,000
- 0 <= nums[i] <= 100,000
