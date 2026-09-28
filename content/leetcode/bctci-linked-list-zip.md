# Linked-List Zip

Given the heads of two singly linked lists, interleave their nodes, starting with the first list.
When one list runs out, append the rest of the other.
Reuse the existing nodes instead of creating new ones, and return the new head.

## Examples

### Example 1

```text
Input: head1 = [1, 3, 5], head2 = [2, 4, 6]
Output: [1, 2, 3, 4, 5, 6]
```

### Example 2

```text
Input: head1 = [1, 2, 3, 4], head2 = [8, 7]
Output: [1, 8, 2, 7, 3, 4]
```

## Constraints

- Each list has at most `10^5` nodes.
