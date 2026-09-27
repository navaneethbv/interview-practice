# Minimum Jumps to Reach End via Prime Teleportation

Start at index 0 and reach the final index.
A move may go to an adjacent index, or, when the current value is prime p, to any different index whose value is divisible by p.
Return the fewest moves.

## Examples

### Example 1

```text
Input: nums = [2, 9, 7, 8]
Output: 1
Explanation: The initial prime 2 can teleport directly to the final 8.
```

### Example 2

```text
Input: nums = [4, 6, 8]
Output: 2
Explanation: Composite values cannot initiate teleportation, so use adjacent steps.
```

## Constraints

- 1 <= nums.length <= 100000
- 1 <= nums[i] <= 1000000
