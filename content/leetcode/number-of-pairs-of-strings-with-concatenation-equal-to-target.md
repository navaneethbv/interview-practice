# Number of Pairs of Strings With Concatenation Equal to Target

Count ordered pairs of distinct indices `(i,j)` for which `nums[i] + nums[j]` equals target.
Equal strings at different indices remain separate choices.

## Constraints

- There are 2 to 100 digit strings, each length 1 to 100.
- target has length 1 to 100 and contains decimal digits.

## Examples

### Example 1

```text
Input: nums = ["1", "1", "11"], target = "11"
Output: 2
Explanation: The two distinct 1 entries can be ordered in two ways.
```

### Example 2

```text
Input: nums = ["12", "3", "1", "23"], target = "123"
Output: 2
Explanation: The pairs are 12 then 3, and 1 then 23.
```
