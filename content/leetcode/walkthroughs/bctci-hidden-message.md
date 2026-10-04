## Intuition

Each node chooses where its own character appears relative to the two subtree messages.
The child ordering is always left before right; only the node's insertion point changes.

## Brute force

Building a new concatenated string at every node can repeatedly copy long subtree messages and become quadratic on a skewed tree.
Append characters into one shared output buffer instead.

## Approach

The recursive `read` returns immediately for null nodes.
Look up the two-character text using `node.val`.
Append its letter before both children for b, between the child traversals for i, or after both for a.
Always recurse left before right.
Every node's character is appended exactly once at its specified position, so recursively combining the subtree orderings produces the required message.
Finally join or convert the accumulated character buffer into a string.

## Walkthrough

```text
Input: root = [0, 1, 2, 3, 4, 5, null, 6, 7, null, null, null, 8], texts = ["bn", "i_", "a!", "ae", "it", "br", "bi", "bc", "ay"]
Output: "nice_try!"
```

Example 1 begins with root text bn, so n is emitted first.
The left subtree emits i and c before its postorder e, then its inorder underscore and t, yielding `ice_t`.
The right subtree's br emits r before its descendant y, while its a! emits the exclamation mark after that subtree.
Combining these pieces gives `nice_try!`.

## Complexity

Each node is visited once and contributes one character, so time is O(n).
The output buffer uses O(n) space and recursion uses O(h), where h is tree height.

## Edge cases

An empty tree produces an empty string.
A leaf emits its character regardless of whether its order is b, i, or a.
Missing children simply contribute nothing.

## Common mistakes

Do not choose one traversal order for the entire tree; each node has its own rule.
Node values are indices into texts, not character codes.

## Language notes

Python appends to a list and joins once.
Java uses StringBuilder, avoiding repeated immutable-string concatenation while preserving the same recursive ordering.
