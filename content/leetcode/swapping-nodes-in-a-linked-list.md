# Swapping Nodes in a Linked List

Swap the values of the kth node from the beginning and the kth node from the end of a singly linked list.
Positions are one-based.
Return the head after the swap.

## Examples

### Example 1

```text
Input: head = [1, 2, 3, 4, 5], k = 2
Output: [1, 4, 3, 2, 5]
Explanation: The second and fourth values are exchanged.
```

### Example 2

```text
Input: head = [1, 2, 3], k = 2
Output: [1, 2, 3]
Explanation: Both positions refer to the middle node.
```

## Constraints

- The list has 1 to 100000 nodes.
- 1 <= k <= list length.
- 0 <= node.val <= 100.
