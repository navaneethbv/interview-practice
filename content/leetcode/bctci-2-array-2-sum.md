# 2-Array 2-Sum

`sorted_arr` is sorted in ascending order and `unsorted_arr` is not; neither contains duplicates.
Find an index `i` in `sorted_arr` and an index `j` in `unsorted_arr` with `sorted_arr[i] + unsorted_arr[j] == 0`, and return `[i, j]`.
If several pairs exist, return the one with the smallest `j`.
Return `[-1, -1]` if there is none.
Use O(1) extra space and do not modify the inputs.

## Examples

### Example 1

```text
Input: sorted_arr = [-5, -4, -1, 4, 6, 7], unsorted_arr = [-3, 7, 18, 4, 6]
Output: [1, 3]
```

### Example 2

```text
Input: sorted_arr = [1, 2, 3], unsorted_arr = [1, 2, 3]
Output: [-1, -1]
```

## Constraints

- `1 <= sorted_arr.length, unsorted_arr.length <= 10^6`
- `-10^9 <= values <= 10^9`
