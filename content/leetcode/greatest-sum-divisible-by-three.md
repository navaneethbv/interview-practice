# Greatest Sum Divisible by Three

Choose any subset of the input values whose sum is divisible by three.
Return the greatest such sum.
Choosing no values is allowed and gives zero.

## Examples

### Example 1

```text
Input: nums = [3, 6, 5, 1, 8]
Output: 18
Explanation: Select 3,6,1,8 to obtain 18.
```

### Example 2

```text
Input: nums = [4]
Output: 0
Explanation: The only nonempty subset has a sum not divisible by three.
```

## Constraints

- 1 <= nums.length <= 40000.
- 1 <= nums[i] <= 10000.
