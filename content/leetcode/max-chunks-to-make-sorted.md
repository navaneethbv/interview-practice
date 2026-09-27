# Max Chunks To Make Sorted

Split the permutation `arr` into the largest possible number of nonempty contiguous chunks.
Sorting each chunk independently and concatenating them must give the fully sorted array.

## Constraints

- `1 <= arr.length <= 10`.
- The array contains each integer from 0 to n-1 exactly once.

## Examples

### Example 1

```text
Input: arr = [1, 0, 2, 3]
Output: 3
Explanation: Use chunks 1,0; 2; and 3.
```

### Example 2

```text
Input: arr = [3, 2, 1, 0]
Output: 1
Explanation: The reversed permutation must stay in a single chunk.
```
