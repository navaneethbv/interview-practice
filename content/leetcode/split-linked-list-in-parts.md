# Split Linked List in Parts

Split the list into k consecutive parts whose lengths differ by at most one.
Earlier parts must be at least as long as later parts.
Return the part heads in order, using null for empty parts.

## Examples

### Example 1

```text
Input: head = [1, 2, 3], k = 5
Output: [[1], [2], [3], null, null]
Explanation: The first three parts receive one node and the rest are empty.
```

### Example 2

```text
Input: head = [1, 2, 3, 4, 5], k = 3
Output: [[1, 2], [3, 4], [5]]
Explanation: Distribute the extra nodes to the earlier parts.
```

## Constraints

- The list contains 0 through 1,000 nodes.
- 0 <= Node.val <= 1,000
- 1 <= k <= 50
