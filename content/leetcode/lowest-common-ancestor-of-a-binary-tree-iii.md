# Lowest Common Ancestor with Parent Links

Two nodes `p` and `q` belong to the same binary tree.
Each node exposes `val`, `left`, `right`, and `parent`; the root's parent is null.
Return the deepest node that is an ancestor of both nodes, counting a node as its own ancestor.
Your method receives only the two node references.
The testcase's trailing `tree` builds the parent links; `p` and `q` select nodes by their unique values.
Return the original ancestor node, not a newly allocated node with the same value.

## Examples

```text
Input: p = 5, q = 1, tree = [3,5,1,6,2,0,8,null,null,7,4]
Output: 3
Explanation: The nodes lie in separate subtrees of 3.
```

```text
Input: p = 5, q = 4, tree = [3,5,1,6,2,0,8,null,null,7,4]
Output: 5
Explanation: Node 5 is itself an ancestor of node 4.
```

## Constraints

- The tree contains between 1 and 10,000 nodes.
- Values are distinct signed 32-bit integers.
- Both selected values exist in the same tree.
- The root is not passed as a method argument.
