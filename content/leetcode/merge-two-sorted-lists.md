# Merge Two Sorted Lists

Combine two nondecreasing singly linked lists into one nondecreasing list and return its head.
Retain every occurrence of every value.
Nodes expose `val` and `next`; arrays in the test format represent linked lists.

A null return value is displayed as `null` in the output.

## Examples

### Example 1

```text
Input: list1 = [1, 4], list2 = [2, 3, 5]
Output: [1, 2, 3, 4, 5]
Explanation: Merge the two ordered streams.
```

### Example 2

```text
Input: list1 = [], list2 = []
Output: null
Explanation: Both lists are empty.
```

## Constraints

- Each input contains 0 to 50 nodes.
- -100 <= node.val <= 100.
- Both input lists are sorted in nondecreasing order.
