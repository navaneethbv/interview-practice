# Kth Largest Element in a Stream

Initialize a tracker with rank k and an initial collection of numbers.
Each `add(val)` inserts one number and returns the kth largest value among all numbers seen so far, counting duplicates separately.
Every add call leaves at least k numbers in the stream.

Construct one instance per test, then execute the listed operations in order.
The output contains one entry per operation; void methods produce null, and constructor output is omitted.

## Examples

### Example 1

```text
Input: ctor = [3, [4, 5, 8, 2]], ops = ["add", "add", "add"], args = [[3], [5], [10]]
Output: [4, 5, 5]
Explanation: After inserting 3, 5, and 10, the third largest values are 4, 5, and 5.
```

### Example 2

```text
Input: ctor = [1, []], ops = ["add", "add", "add"], args = [[-2], [-5], [0]]
Output: [-2, -2, 0]
Explanation: Rank 1 tracks the largest value seen, so inserting -5 does not lower the result.
```

## Constraints

- 1 <= k <= 10000.
- 0 <= nums.length <= 10000.
- k <= nums.length + 1.
- Values are between -10000 and 10000.
- At most 10000 add calls occur per test.
