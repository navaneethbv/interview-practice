# Shortest Subarray to be Removed to Make Array Sorted

Remove one contiguous segment, possibly empty, so the remaining entries form a nondecreasing array.
Return the shortest removable segment length.

## Examples

### Example 1

```text
Input: arr = [1, 2, 3, 10, 4, 2, 3, 5]
Output: 3
Explanation: Removing [3,10,4] leaves a nondecreasing sequence.
```

### Example 2

```text
Input: arr = [5, 4, 3, 2, 1]
Output: 4
Explanation: Only one entry can remain in sorted order.
```

## Constraints

- 1 <= arr.length <= 100,000
- 0 <= arr[i] <= 10^9
