## Intuition

Each node chooses when its own character appears relative to its two subtrees.
The children still recursively apply their own choices, so this is a traversal with a local ordering rule rather than one global preorder or inorder traversal.

## Brute force

Construct the complete left and right subtree strings at every recursive call, then concatenate them with the current character.
Repeated copying can cost O(nh) for n nodes and height h, particularly in a long narrow tree.

## Approach

Maintain one shared output buffer, `parts` in Python or `message` in Java.
At each node, read its order marker and letter from `texts[node.val]`.
Append before both recursive calls for `b`, between the left and right calls for `i`, and after both calls for `a`.
Null children emit nothing.
Every node appends exactly once, and the selected position gives precisely the recursive message definition.

## Walkthrough

In Example 1, the root text `bn` emits `n` first.
The left subtree's `ae` node emits child letters `i` and `c`, then `e`.
Its parent `i_` contributes `_` between that subtree and the node contributing `t`.
The right subtree contributes `r`, then `y`, then its `a!` root contributes `!`.
Joining the emissions produces `nice_try!`.

## Complexity

Time is O(n), including final message construction.
The output buffer uses O(n) space and recursive calls use O(h) additional space.

## Edge cases

A null root produces an empty message.
A single node emits its letter regardless of order marker.
Nodes missing one child still place their own character according to the same rules.

## Common mistakes

Do not interpret the node's integer label as the message character.
Do not apply the root's order marker to all descendants.

## Language notes

Python joins the accumulated character list once.
Java uses a `StringBuilder` field; the judge supplies a fresh solution instance for the testcase, so the buffer begins empty.
