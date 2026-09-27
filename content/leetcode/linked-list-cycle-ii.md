# Find the Entry of a Linked List Cycle

Return the first node in a linked list's cycle, or null if following next pointers eventually ends.
Do not modify the links.
The input object contains the node values and `pos`, the zero-based node to which the tail connects.
A position of -1 means there is no cycle.
Your method receives only the head node, without pos.
The judge checks the returned node's identity and displays its index, using -1 for null.

## Examples

```text
Input: head = {"values":[3,2,0,-4],"pos":1}
Output: 1
Explanation: The tail points back to the second node.
```

```text
Input: head = {"values":[1,2],"pos":0}
Output: 0
Explanation: Both nodes belong to a cycle beginning at the head.
```

## Constraints

- There are between 0 and 10,000 nodes.
- Node values are signed 32-bit integers and may repeat.
- pos is -1 or an existing node index.
- Aim for constant extra space.
