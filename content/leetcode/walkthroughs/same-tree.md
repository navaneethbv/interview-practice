## Intuition

Tree equality requires both matching values and matching missing-child positions.
Traverse the trees together as pairs of corresponding nodes.
A pair disagrees immediately if exactly one node is absent or their values differ.

## Approach

1. Initialize `stack` with the pair `(p, q)`.
2. Pop one pair at a time.
3. If either node is null, require that both are null, then continue.
4. Otherwise compare their values and return false on a mismatch.
5. Push the corresponding left-child pair and right-child pair.
6. Return true when every pair has been checked.

The stack contains corresponding positions, not merely nodes with potentially matching values.
Checking null pairs preserves shape information even when different structures have the same value traversal.
Every successful nonnull pair reduces equality to equality of its two child pairs.
A separate brute-force method adds little to this direct structural comparison.

## Walkthrough

Example 1 compares two trees represented by `[2, 1, 3]`.

| Corresponding position | Values or absence | Result |
| --- | --- | --- |
| Root | 2 and 2 | Match; queue child pairs |
| Right child | 3 and 3 | Match |
| Right child's children | Both null on each side | Match |
| Left child | 1 and 1 | Match |
| Left child's children | Both null on each side | Match |

The explicit stack processes the right pair before the left because it was pushed last.
Every pair agrees, so return true.

## Complexity

- Time: O(n) for equal n-node trees, or until the first mismatch for unequal trees.
- Space: O(h), where h is the largest explored depth, for pending DFS pairs; worst case O(n).

## Edge cases

Two empty trees are equal.
One empty tree and one nonempty tree are unequal.
Duplicate values still require matching structure.
A child appearing on the left in one tree and the right in the other causes a null mismatch.

## Common mistakes

- Comparing only a traversal of values can lose missing-child positions.
- Treating a pair as equal whenever either node is null ignores one-sided absence.
- Comparing object identity for nonnull nodes rejects distinct but structurally equal trees.

## Language notes

Python stores node pairs as tuples.
Java stores each pair in a small `TreeNode[]` inside `ArrayDeque`, allowing null components without inserting a null deque element.
Both versions use explicit stacks instead of recursive equality calls.
