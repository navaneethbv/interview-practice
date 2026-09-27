# XOR After Range Multiplication Queries II

For each query [l,r,k,v], multiply entries at indices l, l+k, l+2k, and so on through r by v, reducing each result modulo 1,000,000,007.
Return the bitwise XOR of all final entries.

## Examples

### Example 1

```text
Input: nums = [1, 2, 3], queries = [[0, 2, 2, 2]]
Output: 6
Explanation: The array becomes [2,2,6], whose XOR is 6.
```

### Example 2

```text
Input: nums = [5], queries = [[0, 0, 1, 3], [0, 0, 1, 2]]
Output: 30
Explanation: The single value is multiplied by 3 and then by 2.
```

## Constraints

- 1 <= nums.length, queries.length <= 100000
- 1 <= nums[i] <= 1000000000
- 0 <= l <= r < nums.length; 1 <= k <= nums.length; 1 <= v <= 100000
