# Flatten a Multilevel Doubly Linked List

Each node has `val`, `prev`, `next`, and an optional `child` pointing to another doubly linked list.
Flatten the structure into one list by placing each child list immediately after its parent node, before the parent's former next node.
Apply the same rule recursively within child lists.
Reuse the existing nodes, repair both next and previous links, and set every child link to null.
Return the head of the flattened list.
Fixtures represent a list as objects with `val` and an optional nested `child` array.
The judge displays the flattened values and checks identities and pointers.

## Examples

```text
Input: head = [{"val":1},{"val":2,"child":[{"val":7},{"val":8,"child":[{"val":11}]}]},{"val":3}]
Output: [1,2,7,8,11,3]
Explanation: Visit each child's complete list before resuming the parent level.
```

```text
Input: head = [{"val":1,"child":[{"val":2}]}]
Output: [1,2]
Explanation: Node 2 follows node 1 and its previous pointer refers to node 1.
```

## Constraints

- The complete structure contains between 0 and 1000 nodes.
- Values are signed 32-bit integers and may repeat.
- Input next and child links form an acyclic hierarchy without shared nodes.
- The flattened head has no previous node and the tail has no next node.
