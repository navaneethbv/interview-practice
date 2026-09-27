# Max Consecutive Ones III

You may change at most `k` zero entries to 1 in a binary array.
Return the longest contiguous run of 1s obtainable.

## Examples

### Example 1

```text
Input: nums = [1, 0, 1, 1, 0, 1], k = 1
Output: 4
Explanation: Flip either zero to create a run of four.
```

### Example 2

```text
Input: nums = [0, 0, 0], k = 2
Output: 2
Explanation: Two flips can create a run of length two.
```

## Constraints

- 1 <= nums.length <= 100,000
- nums is binary; 0 <= k <= nums.length.
