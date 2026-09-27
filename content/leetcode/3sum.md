# 3Sum

Return every distinct triple of values whose sum is zero and that can be selected from three different indices in `nums`.
Do not repeat a triple.
Both the triple order and the value order within a triple are unrestricted.

## Examples

### Example 1

```text
Input: nums = [-2, 0, 2, 2, -1, -1]
Output: [[-2, 0, 2], [-1, -1, 2]]
Explanation: There are two distinct value triples with sum zero.
```

### Example 2

```text
Input: nums = [0, 0, 0, 0]
Output: [[0, 0, 0]]
Explanation: The same value triple is returned only once.
```

## Constraints

- 3 <= nums.length <= 3,000
- -100,000 <= nums[i] <= 100,000
