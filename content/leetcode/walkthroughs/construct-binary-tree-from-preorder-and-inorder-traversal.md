## Intuition

Preorder tells us which node to create next, while inorder tells us when a node's left side is complete.
A stack tracks ancestors whose right subtrees may still need to be attached.
Advancing through inorder lets us unwind exactly those completed ancestors without recursive slicing.

## Brute force

Recursively locate each preorder root by scanning its inorder segment and copy the resulting traversal slices.
On skewed trees this can take O(n²) time and allocate many temporary arrays.
The iterative stack method consumes both traversals monotonically.

## Approach

1. Create the root from `preorder[0]`, push it, and set the inorder cursor to zero.
2. For each remaining preorder value, create `node`.
3. If the stack top differs from the next inorder value, attach `node` as its left child.
4. Otherwise pop matching stack tops while advancing the inorder cursor.
5. Attach `node` as the right child of the last popped `parent`.
6. Push the new node and continue, then return the root.

Matching the inorder cursor means a node's left subtree has already been consumed.
Multiple consecutive matches unwind completed ancestor levels until the next preorder value belongs in the last completed ancestor's right subtree.

## Walkthrough

Example 1 uses preorder `[4, 2, 1, 3, 6]` and inorder `[1, 2, 3, 4, 6]`.

| New value | Stack/cursor decision | Attachment |
| --- | --- | --- |
| 4 | Initialize | Root |
| 2 | Top 4 differs from inorder 1 | Left child of 4 |
| 1 | Top 2 differs from inorder 1 | Left child of 2 |
| 3 | Pop 1, then 2 as inorder advances | Right child of 2 |
| 6 | Pop 3, then 4 | Right child of 4 |

The rebuilt level-order tree is `[4, 2, 6, 1, 3]`.

## Complexity

- Time: O(n), since each node is created, pushed, and popped at most once.
- Space: O(h) auxiliary stack space plus O(n) reconstructed nodes, where h is tree height.

## Edge cases

One traversal value creates a singleton.
Entirely left- or right-skewed trees are handled iteratively.
Distinct values and mutually consistent traversals are required for the cursor comparisons to be unambiguous.

## Common mistakes

- Attaching the right child to the first popped node instead of the last chooses the wrong ancestor.
- Advancing the inorder cursor when adding every node breaks its completion meaning.
- Repeatedly slicing arrays loses the linear-time and space advantages.

## Language notes

Python iterates by preorder index to avoid making a suffix slice.
Java uses `ArrayDeque` for ancestor storage.
Both return newly allocated `TreeNode` objects and preserve the traversal arrays.
