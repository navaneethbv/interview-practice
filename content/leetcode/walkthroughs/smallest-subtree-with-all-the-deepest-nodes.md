## Intuition

Each subtree can summarize both its height and the smallest subtree containing its deepest nodes.
If the left and right heights match, their deepest nodes meet at the current node.
If one side is taller, all deepest nodes are on that side, so its candidate can be passed upward unchanged.

## Brute force

One approach repeatedly computes left and right subtree heights while descending toward the answer.
Recomputing heights at successive nodes can take O(n²) time on a chain.
A postorder traversal computes each height once and carries the candidate alongside it.

## Approach

1. Return height zero and no candidate for an absent node.
2. Recursively obtain the left and right subtree summaries.
3. If their heights are equal, return that height plus one and the current node.
4. Otherwise return the taller height plus one and that side's candidate.
5. Return the candidate from the root's final summary.

A summary's height describes its entire subtree, while its candidate may be a descendant.
Keeping these two meanings separate is essential when returning a result through several ancestors.

## Walkthrough

Example 1 has root 3 and deepest leaves 7 and 4, both children of node 2.

| Node summarized | Left height | Right height | Returned height | Candidate |
| --- | --- | --- | --- | --- |
| 7 | 0 | 0 | 1 | 7 |
| 4 | 0 | 0 | 1 | 4 |
| 2 | 1 | 1 | 2 | 2 |
| 5 | 1 | 2 | 3 | 2 |
| 1 | 1 | 1 | 2 | 1 |
| 3 | 3 | 2 | 4 | 2 |

At node 3, the left side is taller, so candidate 2 survives.
Its subtree serializes as `[2,7,4]`, matching the required output.

## Complexity

- Time: O(n), because each node is summarized once.
- Space: O(h) live auxiliary storage for recursion and summaries, where h is the tree height.

## Edge cases

A single node returns itself.
A chain returns its unique deepest leaf.
If the deepest nodes span both root branches, the root becomes the answer.
The method returns an original node and never rebuilds the tree.

## Common mistakes

- Returning the taller child's root loses a deeper candidate already identified inside it.
- Comparing node values instead of heights does not measure depth.
- Returning the overall root whenever both children exist ignores unequal subtree heights.

## Language notes

Python returns `(height, candidate)` tuples; Java uses the small private `SubtreeResult` class.
Both use recursive postorder traversal, with depth bounded by the statement's 500-node limit.
The Java result wrapper is implementation state, not a replacement for the harness-provided `TreeNode`.
