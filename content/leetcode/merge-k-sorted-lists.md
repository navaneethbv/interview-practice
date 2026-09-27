# Merge k Sorted Lists

Merge all of the nondecreasing linked lists in `lists` into one nondecreasing linked list.
Return its head, preserving duplicate values.
Each inner array in the test format represents one linked list; an empty inner array represents a null head.

A null return value is displayed as `null` in the output.

## Examples

### Example 1

```text
Input: lists = [[1, 6], [2, 4], [3, 5]]
Output: [1, 2, 3, 4, 5, 6]
Explanation: Values from all three lists appear in sorted order.
```

### Example 2

```text
Input: lists = []
Output: null
Explanation: There are no lists to merge.
```

## Constraints

- 0 <= lists.length <= 10000.
- The combined number of nodes is at most 10000.
- -10000 <= node.val <= 10000.
- Every input list is sorted in nondecreasing order.
