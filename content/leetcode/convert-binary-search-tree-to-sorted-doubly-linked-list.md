# Turn a BST into a Circular Doubly Linked List

Rewire a binary search tree into a sorted circular doubly linked list using the existing nodes.
Use each node's `left` link for its predecessor and `right` link for its successor.
Return the smallest node; its predecessor must be the largest node, whose successor must be the smallest.
An empty tree produces null.
The judge checks both link directions and original node identities, then displays one traversal through the successor links.

## Examples

```text
Input: root = [4,2,5,1,3]
Output: [1,2,3,4,5]
Explanation: The tail holding 5 links forward to 1, and 1 links backward to 5.
```

```text
Input: root = [2,1,3]
Output: [1,2,3]
Explanation: The three original nodes form a circular list in ascending order.
```

## Constraints

- The tree has between 0 and 2000 nodes.
- Values are distinct signed 32-bit integers.
- The input satisfies the binary search tree ordering rule.
- Allocate no replacement list nodes.
