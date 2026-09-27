# Maximum Number of Operations With the Same Score II

An operation removes the first two numbers, the last two numbers, or the first and last numbers.
Its score is the sum of the two removed values.
Return the largest number of operations possible when every operation has the same score, chosen by the first operation.

## Constraints

- `2 <= nums.length <= 2000`.
- Values range from 1 to 1000.

## Examples

### Example 1

```text
Input: nums = [1, 2, 1, 2]
Output: 2
Explanation: Remove the first pair twice; both scores are 3.
```

### Example 2

```text
Input: nums = [1, 2, 4, 8]
Output: 1
Explanation: No two disjoint removable pairs share a score.
```
