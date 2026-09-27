## Intuition

A binary search tree's inorder values are sorted.
Swapping two node values creates one or two inversions between adjacent inorder visits.
Remember the first larger predecessor and the latest smaller node, then swap their values.

## Brute force

Collecting all inorder values, sorting them, and comparing positions can identify the two wrong values.
That uses O(n) extra storage and requires a second traversal to rewrite nodes.
The iterative traversal records only the inversion endpoints and uses O(H) stack space.

## Approach

1. Traverse the tree in inorder with an explicit stack.
2. Compare each visited value with the previous visited node.
3. Record the previous node at the first inversion.
4. Update the second wrong node at every inversion.
5. Swap the recorded values after traversal finishes.

## Walkthrough

Example 1 is [1,3,null,null,2].
Its inorder values are 3, 2, 1, so the first inversion records 3 and 2 and the second records 2 and 1.
The first wrong node is 3 and the latest smaller node is 1.
Swapping those values changes the tree to [3,1,null,null,2], which is the expected repaired representation.

## Complexity

For n nodes, inorder traversal takes O(n) time.
The explicit stack uses O(H) auxiliary space for tree height H.
Only node values are swapped, so no replacement nodes or output tree are allocated.
The returned value is void because the harness observes the mutated root.

## Edge cases

Adjacent swapped values create one inversion.
Distant swapped values create two inversions, and the latest smaller node is retained.
A valid tree has no inversion and needs no swap.
A null root leaves the tree unchanged.

## Common mistakes

- Swapping the first inversion pair immediately fails for nonadjacent swapped nodes.
- Comparing values without retaining the previous node loses the inversion boundary.
- Rebuilding the tree changes node identity unnecessarily.
- Recursion adds avoidable depth risk for a tree repair task.

## Language notes

Python and Java use iterative inorder stacks.
Java checks both recorded nodes before swapping for a valid already-correct tree.
Both mutate only the two value fields.
