# Reorder List

Rewire a singly linked list so that its nodes appear in this order: first, last, second, second-last, and so on.
Modify the list in place without changing node values.
Your method returns nothing; the judge inspects the list reachable from the original head.

## Examples

### Example 1

```text
Input: head = [1, 2, 3, 4]
Output: [1, 4, 2, 3]
Explanation: Alternate taking nodes from the front and back.
```

### Example 2

```text
Input: head = [5, 6, 7, 8, 9]
Output: [5, 9, 6, 8, 7]
Explanation: The middle node appears last.
```

## Constraints

- The list contains 1 to 50000 nodes.
- 1 <= node.val <= 1000.
