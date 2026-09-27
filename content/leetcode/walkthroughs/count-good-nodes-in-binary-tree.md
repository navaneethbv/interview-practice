## Intuition

Whether a node is good depends only on the largest value among its ancestors.
Carry that maximum down each path instead of storing or rescanning the whole path.
Different branches must receive independent path maxima.

## Brute force

For every node, reconstruct its root-to-node path and compare all ancestor values.
With n nodes and height h, this requires O(nh) comparisons, which can become O(n²).
Passing the maximum as traversal state reduces each node's decision to one comparison.

## Approach

1. Use iterative depth-first search, storing `(node, maximum)` frames in `pending`.
2. Begin with the root and its own value, which makes the root qualify.
3. Pop a frame and increment `count` if `node.val >= maximum`.
4. Update `maximum` to include the current value.
5. Push each existing child with that updated path maximum.
6. Return `count` when the stack is empty.

The maximum in a child's frame summarizes exactly its ancestor path.
It does not include values from siblings, so a large value in one subtree cannot incorrectly disqualify a node in another.
Equal values qualify because the comparison is inclusive.

## Walkthrough

Example 1 is `[3, 1, 4, 3, null, 1, 5]`.
Right children are popped first because they are pushed last.

| Visited node | Incoming `maximum` | Good? | `count` |
| --- | --- | --- | --- |
| Root 3 | 3 | Yes | 1 |
| Right 4 | 3 | Yes | 2 |
| Right-right 5 | 4 | Yes | 3 |
| Right-left 1 | 4 | No | 3 |
| Left 1 | 3 | No | 3 |
| Left-left 3 | 3 | Yes | 4 |

The final answer is 4.
The second value 3 qualifies by tying its root ancestor.

## Complexity

- Time: O(n), because each node is pushed and popped once.
- Space: O(h) for the depth-first traversal stack, at most O(n) in the worst case.

## Edge cases

A single root contributes one.
All-equal trees count every node.
Negative values work because initialization uses the root's value, rather than zero.
The statement requires at least one node, so accessing `root.val` initially is valid.

## Common mistakes

- Using a single global maximum incorrectly mixes unrelated branches.
- Testing strict `>` rejects equal values that should count.
- Starting with zero incorrectly rejects negative roots.

## Language notes

Python stores pairs in a list used as a stack.
Java uses a `Frame` record and `ArrayDeque`, retaining a separate integer maximum in each frame.
Both implementations avoid recursive depth limits for the allowed 100000-node tree.
