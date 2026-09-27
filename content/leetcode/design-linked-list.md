# Design Linked List

Implement a linked list with zero-based indices.
`get(index)` returns its value or -1 if invalid.
`addAtHead(val)` and `addAtTail(val)` insert at the ends.
`addAtIndex(index,val)` inserts before that index, appending when index equals the length, and does nothing when index exceeds the length.
`deleteAtIndex(index)` removes the indexed node if it exists.

## Examples

### Example 1

```text
Input: constructor = [], operations = ["addAtHead", "addAtTail", "addAtIndex", "get", "deleteAtIndex", "get"], arguments = [[1], [3], [1, 2], [1], [1], [1]]
Output: [null, null, null, 2, null, 3]
Explanation: Insert 2 between 1 and 3, then remove it.
```

### Example 2

```text
Input: constructor = [], operations = ["get", "addAtIndex", "get"], arguments = [[0], [1, 5], [0]]
Output: [-1, null, -1]
Explanation: Inserting beyond the current length does nothing.
```

## Constraints

- 0 <= index, val <= 1,000
- At most 2,000 method calls occur per instance.
- Implement nodes and links rather than using a built-in linked-list class.
