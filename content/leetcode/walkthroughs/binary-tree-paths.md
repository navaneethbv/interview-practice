## Intuition

Every answer is a root-to-leaf path.
Carry the textual path while descending, and emit it only when both child links are absent.
A stack or depth-first helper visits each branch without losing its prefix.

## Brute force

A naive method could first collect each leaf and then walk from the root to reconstruct its path.
That repeats shared prefixes for every leaf and needs parent or path searches.
Direct depth-first construction appends each edge while the branch is active.

## Approach

1. Return an empty list for a null root.
2. Start a stack or helper call with the root value as the path.
3. Add an arrow and child value when descending.
4. Append the path at a leaf.
5. Continue through both child branches.

## Walkthrough

Example 1 is [1,2,3,null,5].
The path through 2 continues to its right child 5 and emits 1->2->5.
The root's right child 3 is a leaf and emits 1->3.
The result contains those two root-to-leaf strings.

## Complexity

Let n be node count, H tree height, and P total output characters.
Immutable path concatenation copies up to O(H) characters at each visited node, so the worst-case time is O(nH).
The returned paths use O(P) space, and the Python active stack can retain O(H²) characters across path prefixes in a branching tree.
Java recursion uses O(H) call-stack space in addition to its output strings.

## Edge cases

A null root returns no paths.
A single root emits one value without an arrow.
A leaf ends its path immediately.
A skewed tree produces one path containing every node.

## Common mistakes

- Emitting a path at an internal node adds invalid partial answers.
- Adding arrows before the first value creates a malformed path.
- Visiting only one child loses other leaves.
- Sharing a mutable path without restoring it contaminates sibling branches.

## Language notes

Python carries immutable path strings on an explicit stack, so its path-copying cost is visible in the space bound.
Java uses a recursive helper with a fresh concatenated path per child.
Both preserve left-to-right output order for the local reference.
