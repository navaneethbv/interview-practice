# Jump Game II

Start at index 0, where `nums[i]` gives the maximum distance of a forward jump from index i.
Return the fewest jumps needed to reach the final index.
The final index is guaranteed reachable.

## Examples

### Example 1

```text
Input: nums = [2, 3, 1, 1, 4]
Output: 2
Explanation: Jump to index 1 and then to index 4.
```

### Example 2

```text
Input: nums = [0]
Output: 0
Explanation: You already occupy the final index.
```

## Constraints

- 1 <= nums.length <= 10,000
- 0 <= nums[i] <= 1,000
- At least one route reaches the last index.
