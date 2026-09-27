# Partition List

Rearrange the list so all nodes with values smaller than x come before all remaining nodes.
Preserve original relative order within each of these two groups.
Return the new head.

## Examples

### Example 1

```text
Input: head = [1, 4, 3, 2, 5, 2], x = 3
Output: [1, 2, 2, 4, 3, 5]
Explanation: Keep the order of the three smaller nodes and the other three nodes.
```

### Example 2

```text
Input: head = [2, 1], x = 2
Output: [1, 2]
Explanation: The node with value 1 moves before value 2.
```

## Constraints

- The list contains 0 through 200 nodes.
- -100 <= Node.val <= 100
- -200 <= x <= 200
