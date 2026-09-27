## Intuition

Reverse a block only after proving that all k nodes exist.
Keep a pointer immediately before the block so its new head can be reattached easily.
The old first node becomes the reversed block's tail and the predecessor for the next block.

## Brute force

Collect node references into an array, reorder each complete k-sized slice, and reconnect the nodes.
That takes O(n) time but O(n) additional storage.
Direct pointer reversal performs the same transformation using constant auxiliary space.

## Approach

1. Use iterative linked-list reversal with a `dummy` node pointing to head and `before` initially pointing to dummy.
2. Advance k links from `before` to find `end`; if no complete group exists, return the current list.
3. Save `after = end.next`, the first node outside the group.
4. Reverse links from `before.next` until reaching `after`, starting `previous` at `after`.
5. Connect `before.next` to `end`, now the group's new head.
6. Move `before` to the group's original first node and continue.

Initializing the reversed tail's next pointer to `after` preserves the suffix connection.
The dummy node makes the first group follow the same reconnection rule as every later group.
All changes affect links, never the values stored inside nodes.

## Walkthrough

Example 1 is `[1, 2, 3, 4, 5]` with `k = 2`.

| Group | `before` | `end` | `after` | List after reversal |
| --- | --- | --- | --- | --- |
| First | Dummy | 2 | 3 | `[2, 1, 3, 4, 5]` |
| Second | 1 | 4 | 5 | `[2, 1, 4, 3, 5]` |
| Incomplete suffix | 3 | Missing | Not used | Unchanged |

After the first reversal, `before` becomes node 1; after the second, it becomes node 3.
The final node 5 remains untouched because advancing two links cannot complete another group.

## Complexity

- Time: O(n), because group discovery and reversal each scan a node only a constant number of times.
- Space: O(1), for the dummy and a fixed number of node references.

## Edge cases

For k = 1, links are reattached without changing order.
For k equal to the list length, the whole list reverses.
A short final suffix is preserved.
Duplicate values do not matter because the algorithm manipulates node identities.

## Common mistakes

- Reversing before checking group length alters an incomplete suffix.
- Overwriting `current.next` before saving `following` loses the remaining chain.
- Moving `before` to the new head instead of the old head starts the next group incorrectly.

## Language notes

Python expresses discovery and reversal inline and tests identity with `is`.
Java extracts `advance` and `reverseBlock` helpers and compares object references with `!=`.
Both use the harness-provided `ListNode` class and allocate no replacement data nodes.
