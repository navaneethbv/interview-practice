# Remove Dups

Given the head of an unsorted singly linked list, remove every node whose value already appeared earlier in the list.
Keep the first occurrence of each value and preserve the relative order of the kept nodes.
Return the head of the resulting list.

## Examples

### Example 1

```text
Input: head = [3, 1, 3, 2, 1]
Output: [3, 1, 2]
```

### Example 2

```text
Input: head = [7, 7, 7]
Output: [7]
```

## Constraints

- `0 <= number of nodes <= 10,000`
- `-100,000 <= Node.val <= 100,000`

Follow-up: solve it with O(1) extra space if a temporary buffer is not allowed.
