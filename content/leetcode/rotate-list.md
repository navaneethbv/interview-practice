# Rotate List

Rotate the linked list to the right `k` times.
One rotation moves the final node to the front.
Return the resulting head.

## Examples

### Example 1

```text
Input: head = [1, 2, 3, 4, 5], k = 2
Output: [4, 5, 1, 2, 3]
Explanation: The final two nodes move to the front.
```

### Example 2

```text
Input: head = [0, 1, 2], k = 4
Output: [2, 0, 1]
Explanation: Four rotations equal one rotation for a three-node list.
```

## Constraints

- The list contains 0 through 500 nodes.
- -100 <= Node.val <= 100
- 0 <= k <= 2 * 10^9
