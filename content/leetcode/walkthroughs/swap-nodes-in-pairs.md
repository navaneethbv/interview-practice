## Intuition

Each pair can be rewired locally without changing the order of nodes outside that pair.
`previous` points to the node before the pair, while `first` and `second` identify the two nodes to swap.
A dummy node gives the first pair the same predecessor structure as every later pair.

## Brute force

Collecting values into an array and writing swapped values back takes O(n) time and O(n) space, and it changes values rather than demonstrating node rewiring.
Recursion also works, but the iterative links avoid call-stack growth and use constant auxiliary space.

## Approach

1. Link `dummy` before `head` and set `previous = dummy`.
2. While two nodes remain, name them `first` and `second`.
3. Link `first` after the pair's successor, put `second` before `first`, and connect `previous` to `second`.
4. Move `previous` to `first`, which is now the last node in the swapped pair.
5. Return `dummy.next`.

## Walkthrough

Example 1 uses `[1, 2, 3, 4]`.

| pair | links after swap | list view |
| --- | --- | --- |
| 1, 2 | `previous -> 2 -> 1 -> 3` | `[2, 1, 3, 4]` |
| 3, 4 | `previous -> 4 -> 3 -> null` | `[2, 1, 4, 3]` |

After the first swap, `previous` moves to node 1 so the next pair attaches in the same way.

## Complexity

- Time: O(n), because each node is visited and rewired once.
- Space: O(1) auxiliary, excluding the existing nodes and dummy sentinel.

## Edge cases

An empty list returns the dummy's next value, which is null.
A one-node list has no complete pair and remains unchanged.
An odd final node stays after all swapped pairs.
The algorithm reuses every original node instead of allocating replacement nodes.

## Common mistakes

- Moving `previous` to `second` skips the first node of the next pair.
- Updating `first.next` after losing `second.next` can disconnect the suffix.
- Returning `head` ignores the possibility that the first pair changed the head.

## Language notes

Python and Java both mutate the harness-provided `ListNode` links.
Java uses the helper constructor `new ListNode(0, head)` supplied by the judge.
The dummy sentinel is local state and is never included in the returned list.
