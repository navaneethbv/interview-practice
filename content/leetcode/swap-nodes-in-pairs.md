# Swap Nodes in Pairs

Swap each adjacent pair of nodes in the linked list and return its new head.
Change node links rather than changing stored values.
An unpaired final node stays in place.

## Examples

### Example 1

```text
Input: head = [1, 2, 3, 4]
Output: [2, 1, 4, 3]
Explanation: Swap the first pair and the second pair.
```

### Example 2

```text
Input: head = [1, 2, 3]
Output: [2, 1, 3]
Explanation: The last node has no partner.
```

## Constraints

- The list contains 0 through 100 nodes.
- 0 <= Node.val <= 100
