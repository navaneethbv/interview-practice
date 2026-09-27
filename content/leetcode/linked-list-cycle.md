# Linked List Cycle

Return whether repeatedly following `next` from `head` can revisit a node.
A cycle depends on node identity, not on repeated values.

Tests encode a list as `{"values": [...], "pos": k}`.
When k is a valid zero-based index, the tail points back to that node; -1 means the tail points to null.
The position is only used to construct the list and is not passed to your method.

## Examples

### Example 1

```text
Input: head = {"values": [5, 7, 9], "pos": 1}
Output: true
Explanation: After reaching 9, the next pointer returns to the node containing 7.
```

### Example 2

```text
Input: head = {"values": [2, 2], "pos": -1}
Output: false
Explanation: Equal values do not make these distinct nodes a cycle.
```

## Constraints

- The list contains 0 to 10000 nodes.
- -100000 <= node.val <= 100000.
- pos is -1 or a valid node index.
- Aim for O(1) additional space.
