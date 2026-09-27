# Populate Next Pointers in a Perfect Tree

A binary tree has an extra `next` pointer on each node, initially null.
Connect each node to its immediate neighbor on the right at the same depth.
The last node on each level must point to null.
Return the original root.
The tree is perfect: every internal node has two children and all leaves have the same depth.
Aim to use constant auxiliary space; recursion stack space is excluded for this follow-up.
Inputs use level-order values.
Outputs list each level by following its `next` links.

## Examples

```text
Input: root = [1, 2, 3, 4, 5, 6, 7]
Output: [[1], [2, 3], [4, 5, 6, 7]]
Explanation: Each row follows next pointers from the leftmost node of that depth.
```

```text
Input: root = []
Output: []
Explanation: An empty tree has no pointers to connect.
```

## Constraints

- 0 <= number of nodes <= 6000
- Node values fit signed 32-bit integers.
- The input is a valid binary tree and is perfect.
