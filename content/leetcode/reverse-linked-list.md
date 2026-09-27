# Reverse Linked List

Reverse the direction of a singly linked list and return its new head.
Each node exposes `val` and `next`.
The test format represents a list as an array of values; an empty array is a null head.

A null return value is displayed as `null` in the output.

## Examples

### Example 1

```text
Input: head = [2, 4, 6]
Output: [6, 4, 2]
Explanation: The old tail becomes the new head.
```

### Example 2

```text
Input: head = []
Output: null
Explanation: Reversing an empty list still gives an empty list.
```

## Constraints

- The list contains 0 to 5000 nodes.
- -5000 <= node.val <= 5000.
