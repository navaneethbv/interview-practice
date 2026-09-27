# Remove Zero Sum Consecutive Nodes from Linked List

Repeatedly delete consecutive groups of linked-list nodes whose values sum to zero until no such group remains.
Return any valid remaining head.
The result is represented as a value array, or null when every node is deleted.

## Examples

### Example 1

```text
Input: head = [1, 2, -3, 3, 1]
Output: [3, 1]
Explanation: Delete the initial group 1, 2, -3.
```

### Example 2

```text
Input: head = [1, -1]
Output: null
Explanation: The entire list sums to zero.
```

## Constraints

- The list contains 1 to 1000 nodes.
- -1000 <= node.val <= 1000.
