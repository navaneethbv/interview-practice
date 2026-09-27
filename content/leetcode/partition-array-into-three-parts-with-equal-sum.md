# Partition Array Into Three Parts With Equal Sum

Return whether arr can be split into exactly three nonempty contiguous parts with equal sums.

## Examples

### Example 1

```text
Input: arr = [0, 2, 1, -6, 6, -7, 9, 1, 2, 0, 1]
Output: true
Explanation: One valid split is after indices 2 and 7, producing three sums of 3.
```

### Example 2

```text
Input: arr = [1, 2, 3]
Output: false
Explanation: No two cut positions create three equal sums.
```

## Constraints

- 3 <= arr.length <= 50,000
- -10,000 <= arr[i] <= 10,000
