# Array Nesting

The array is a permutation of the integers from 0 to n-1.
Starting at any index k, repeatedly follow the value as the next index until an index repeats.
Return the largest number of distinct indices visited by any such sequence.

## Constraints

- `1 <= nums.length <= 100000`.
- Every integer from 0 to n-1 appears exactly once.

## Examples

### Example 1

```text
Input: nums = [1, 2, 0, 4, 3]
Output: 3
Explanation: Indices 0,1,2 form a three-element cycle.
```

### Example 2

```text
Input: nums = [0, 1, 2]
Output: 1
Explanation: Each index points to itself.
```
