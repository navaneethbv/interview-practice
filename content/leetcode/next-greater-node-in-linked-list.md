# Next Greater Node in Linked List

For each linked-list node, return the value of the first later node with a strictly larger value.
Use 0 when no later node qualifies.

## Examples

### Example 1

```text
Input: head = [2, 1, 5]
Output: [5, 5, 0]
Explanation: The final 5 is the first greater value for both earlier nodes.
```

### Example 2

```text
Input: head = [3, 3, 2]
Output: [0, 0, 0]
Explanation: An equal value is not strictly greater.
```

## Constraints

- The list contains 1 to 10000 nodes.
- 1 <= node.val <= 1000000000.
