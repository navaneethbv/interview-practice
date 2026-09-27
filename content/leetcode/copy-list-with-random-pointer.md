# Copy List with Random Pointer

Deep-copy a linked list whose nodes expose `val`, `next`, and `random`.
Each random pointer can be null or point to any node in the same list, including its own node.
Return the head of a newly allocated list with identical values and pointer relationships.
No pointer in the copy may refer to an original node.

Tests represent each node as `[value, randomIndex]`, where a null index means no random target.
The array order defines the next pointers.

## Examples

### Example 1

```text
Input: head = [[5, 1], [7, 0]]
Output: [[5, 1], [7, 0]]
Explanation: The copied nodes point randomly to each other.
```

### Example 2

```text
Input: head = []
Output: []
Explanation: The empty list has an empty copy.
```

## Constraints

- 0 <= number of nodes <= 1000.
- -10000 <= node.val <= 10000.
- Every non-null random pointer targets a node in the input list.
