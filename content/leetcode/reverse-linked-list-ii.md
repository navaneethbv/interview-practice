# Reverse Linked List II

Reverse the nodes from position left through position right, inclusive, inside a singly linked list.
Positions are one-based.
Preserve the order of all nodes outside that segment and return the resulting head.

## Examples

### Example 1

```text
Input: head = [1, 2, 3, 4, 5], left = 2, right = 4
Output: [1, 4, 3, 2, 5]
Explanation: Only positions 2 through 4 are reversed.
```

### Example 2

```text
Input: head = [1, 2, 3], left = 1, right = 3
Output: [3, 2, 1]
Explanation: The selected segment is the whole list.
```

## Constraints

- The list contains 1 to 500 nodes.
- 1 <= left <= right <= list length.
- -500 <= node.val <= 500.
