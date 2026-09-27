## Intuition

Rotating right by the list length returns the original list, so reduce `k` modulo `length`.
After linking the tail to the head, the list is a cycle.
The node at the boundary before the final `rotations` nodes becomes the new tail, and cutting after it produces the answer.

## Brute force

Moving the final node to the front one rotation at a time takes O(nk) time.
For a large `k`, that repeats the same cycle many times even though only `k % n` rotations matter.

## Approach

1. Traverse from `head` to find `tail` and `length`.
2. Set `rotations = k % length`; return early when it is zero.
3. Link `tail.next = head` to form a cycle.
4. Advance the tail `length - rotations` steps.
5. Save `tail.next` as `new_head`, cut `tail.next`, and return `new_head`.

## Walkthrough

Example 1 uses `[1, 2, 3, 4, 5]` and `k = 2`.

| state | value |
| --- | --- |
| measured `length` | 5 |
| reduced `rotations` | 2 |
| circular order | `1 -> 2 -> 3 -> 4 -> 5 -> 1` |
| new tail after 3 advances | 3 |
| `new_head = tail.next` | 4 |

Cutting after 3 returns `[4, 5, 1, 2, 3]`.

## Complexity

- Time: O(n), for one length traversal and one boundary traversal.
- Space: O(1) auxiliary, using existing links and a few pointers.

## Edge cases

An empty list returns null immediately.
One node remains unchanged for every `k`.
`k = 0` and multiples of the length return the original head without forming a cycle.
The modulo operation handles very large allowed rotation counts.

## Common mistakes

- Advancing `k` times ignores the list-length reduction.
- Cutting at the new head instead of the preceding node leaves the cycle or loses nodes.
- Forgetting the zero-rotation return can create an unnecessary cycle.

## Language notes

Python and Java both use the harness-provided `ListNode` and mutate only `next` links.
Java uses an `int` because the spec's `k` fits that type, while Python accepts the same contract naturally.
Both return a node from the original list.
