# Three-Way Merge Without Duplicates

Given three arrays sorted in ascending order, return a sorted array containing every distinct value that appears in any of them, each exactly once.

## Examples

### Example 1

```text
Input: arr1 = [2, 3, 3, 4, 5, 7], arr2 = [3, 3, 9], arr3 = [3, 3, 9]
Output: [2, 3, 4, 5, 7, 9]
```

### Example 2

```text
Input: arr1 = [1, 1, 1, 1], arr2 = [1, 1, 1], arr3 = [1, 1]
Output: [1]
```

## Constraints

- `0 <= arr1.length, arr2.length, arr3.length <= 10^6`
- `-10^9 <= values <= 10^9`
