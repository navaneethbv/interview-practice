## Intuition

Reverse one next-pointer at a time while walking through the original list.
Keep the reversed prefix in `previous` and the unprocessed suffix in `head`.
Saving the next node before changing a pointer prevents the remainder of the list from becoming unreachable.

## Approach

1. Use iterative pointer reversal with `previous = null`.
2. While `head` exists, save `following = head.next`.
3. Point `head.next` back to `previous`.
4. Advance `previous` to the current node and `head` to `following`.
5. Return `previous` after the suffix is exhausted.

Before each iteration, `previous` is the head of the already reversed prefix.
The current `head` is still the first unprocessed node, and `following` preserves access to the rest.
Moving one node from the suffix to the prefix maintains these invariants until every link is reversed.
A separate brute-force solution is unnecessary for this direct pointer transformation.

## Walkthrough

Example 1 starts with `2 -> 4 -> 6 -> null`.

| Processed node | Saved `following` | Reversed prefix at `previous` | Remaining `head` |
| --- | --- | --- | --- |
| Initially | None | Empty | 2 |
| 2 | 4 | `2 -> null` | 4 |
| 4 | 6 | `4 -> 2 -> null` | 6 |
| 6 | null | `6 -> 4 -> 2 -> null` | null |

The returned head is the original node containing 6.
The new list displays as `[6, 4, 2]`.

## Complexity

- Time: O(n), because each node is processed once.
- Space: O(1), using only a fixed number of node references.

## Edge cases

A null head skips the loop and returns null.
One node points back to null and remains the only node.
Duplicate values do not matter because the algorithm rewires node objects rather than searching by value.
The input is assumed acyclic under this problem's list contract.

## Common mistakes

- Overwriting `head.next` before saving it loses the unprocessed suffix.
- Returning `head` after the loop returns null instead of the new head.
- Reversing only values does not reverse the node links requested by the operation.

## Language notes

Python uses `None` and Java uses `null` for the empty prefix and final suffix.
Both implementations are iterative, avoiding recursion depth and call-stack storage.
The harness provides `ListNode`; no helper class declaration or Java import is needed.
