# Reverse Nodes in k-Group

Reverse each complete group of k consecutive nodes in a linked list.
If the final group contains fewer than k nodes, preserve its original order.
Change the links themselves rather than the stored values, and return the new head.

## Examples

### Example 1

```text
Input: head = [1, 2, 3, 4, 5], k = 2
Output: [2, 1, 4, 3, 5]
Explanation: Reverse two complete pairs and leave the last node.
```

### Example 2

```text
Input: head = [1, 2, 3, 4, 5], k = 3
Output: [3, 2, 1, 4, 5]
Explanation: The final pair is shorter than k.
```

## Constraints

- The list contains 1 to 5000 nodes.
- 1 <= k <= number of nodes.
- 0 <= node.val <= 1000.
