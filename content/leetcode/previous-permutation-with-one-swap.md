# Previous Permutation With One Swap

Return the lexicographically largest array that is smaller than `arr` and can be made by swapping exactly two elements of `arr`.
If no swap makes the array smaller, return `arr` unchanged.

## Constraints

- 1 <= arr.length <= 10^4
- 1 <= arr[i] <= 10^4

## Examples

### Example 1

```text
Input: arr = [3, 2, 1]
Output: [3, 1, 2]
Explanation: Swapping 2 and 1 gives [3, 1, 2].
```

### Example 2

```text
Input: arr = [1, 9, 4, 6, 7]
Output: [1, 7, 4, 6, 9]
Explanation: Swap 9 with 7, the largest smaller value after it.
```
