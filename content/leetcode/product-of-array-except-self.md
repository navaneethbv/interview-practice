# Product of Array Except Self

Build an array whose entry at index `i` is the product of every input entry except `nums[i]`.
Use linear time without division.
Try using constant auxiliary space besides the returned array.

## Examples

### Example 1

```text
Input: nums = [2, 3, 4]
Output: [12, 8, 6]
Explanation: Each output omits the input at its own index.
```

### Example 2

```text
Input: nums = [0, 5, 2]
Output: [10, 0, 0]
Explanation: Only the position containing zero has a nonzero answer.
```

## Constraints

- 2 <= nums.length <= 100,000
- -30 <= nums[i] <= 30
- Every prefix product, suffix product, and answer fits a signed 32-bit integer.
