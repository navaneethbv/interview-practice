## Intuition

For a value interval [low, high], each possible root splits the interval into independent left and right ranges.
Combining every left tree with every right tree generates every structurally distinct BST.

## Brute force

Trying arbitrary binary shapes and then checking BST order duplicates structures.
The root interval recurrence enumerates each shape once.

## Approach

1. Return `[None]` for an empty interval so it can combine with a nonempty side.
2. Try each value as the root.
3. Recursively build left and right tree lists.
4. Attach every left-right pair to a new root.

## Walkthrough

For Example 1, n=2.
Root 1 has an empty left list and right tree `[2]`, producing `1` with right child 2.
Root 2 has left tree `[1]` and an empty right list, producing 2 with left child 1.
Both returned trees are distinct.

## Complexity

The number of trees is the Catalan number C_n, so output construction requires O(nC_n) node references.
The recursive interval work also repeats subproblems without memoization and uses O(n) recursion depth.
Python and Java allocate a new root for every left-right combination, while subtree references are shared within combinations.

## Edge cases

n=1 returns one single-node tree.
Empty intervals must contribute one null choice, not an empty list.
The output order is unrestricted.

## Common mistakes

Use values outside the root only in the matching interval.
Do not return an empty list for an empty side.
Create distinct root nodes for each combination.

## Language notes

Python's `_build` stores left and right lists before pairing.
Java follows the same interval recursion with provided `TreeNode` objects.
