# Range Sum Query: Immutable

Build an immutable array wrapper supporting repeated range-sum queries.
`sumRange(left, right)` returns the sum from index left through right, inclusive.
The underlying array never changes.

Construct one instance per test, then execute the listed operations in order.
The output contains one entry per operation; void methods produce null, and constructor output is omitted.

## Examples

### Example 1

```text
Input: ctor = [[2, -1, 4, 3]], ops = ["sumRange", "sumRange"], args = [[0, 2], [1, 3]]
Output: [5, 6]
Explanation: The queried sums are 2 - 1 + 4 = 5 and -1 + 4 + 3 = 6.
```

### Example 2

```text
Input: ctor = [[5]], ops = ["sumRange"], args = [[0, 0]]
Output: [5]
Explanation: The only range contains the single value 5.
```

## Constraints

- 1 <= nums.length <= 10000.
- -100000 <= nums[i] <= 100000.
- 0 <= left <= right < nums.length.
- At most 10000 queries occur per test.
