# Odd Even Linked List

Rearrange the linked list so nodes in odd positions come first, followed by nodes in even positions.
Positions start at 1; preserve the original order within both groups.
Use linear time and constant auxiliary space.

## Examples

### Example 1

```text
Input: head = [1, 2, 3, 4, 5]
Output: [1, 3, 5, 2, 4]
Explanation: Positions 1, 3, and 5 precede positions 2 and 4.
```

### Example 2

```text
Input: head = [2, 1, 3, 5, 6, 4, 7]
Output: [2, 3, 6, 7, 1, 5, 4]
Explanation: Grouping depends on node positions, not value parity.
```

## Constraints

- The list contains 0 through 10,000 nodes.
- -10^6 <= Node.val <= 10^6
