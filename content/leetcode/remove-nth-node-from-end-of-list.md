# Remove Nth Node From End of List

Remove the node that is n positions from the end of the singly linked list, counting the tail as position 1.
Return the head of the remaining list.
Try to locate the node in one traversal using a fixed number of pointers.

A null return value is displayed as `null` in the output.

## Examples

### Example 1

```text
Input: head = [2, 4, 6, 8], n = 2
Output: [2, 4, 8]
Explanation: The second node from the end contains 6.
```

### Example 2

```text
Input: head = [5], n = 1
Output: null
Explanation: Removing the only node leaves a null head.
```

## Constraints

- The list contains 1 to 30 nodes.
- 0 <= node.val <= 100.
- 1 <= n <= number of nodes.
