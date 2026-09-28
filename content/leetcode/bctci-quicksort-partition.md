# Quicksort Partition

Rearrange `arr` in place, using O(1) extra space, so that all elements smaller than `pivot` come first, then all elements equal to `pivot`, then all elements larger than it.
The order inside each group does not matter; any valid arrangement is accepted.

## Examples

### Example 1

```text
Input: arr = [1, 7, 2, 3, 3, 5, 3], pivot = 4
Output: [1, 2, 3, 3, 3, 7, 5]
```

### Example 2

```text
Input: arr = [1, 7, 2, 3, 3, 5, 3], pivot = 3
Output: [1, 2, 3, 3, 3, 7, 5]
```

## Constraints

- `0 <= arr.length <= 10^6`
- `-10^9 <= arr[i], pivot <= 10^9`
