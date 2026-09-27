## Intuition

Rearrange links by position rather than by node value.
`odd` tracks the tail of the odd-position chain, `even` tracks the tail of the even-position chain, and `even_head` remembers where that second chain begins.
After the scan, append the even chain to the odd chain.

## Brute force

Copying nodes into two arrays and rebuilding the list takes O(n) time and O(n) extra space.
Alternating repeated scans to find the next odd or even node can take O(n²), while link rewiring uses one pass.

## Approach

1. Return immediately for an empty list.
2. Initialize `odd`, `even`, and `even_head` from the first two nodes.
3. While an even node has a following node, link the next odd node after `odd`, then link the next even node after `even`.
4. Append `even_head` after the final odd node and return `head`.

## Walkthrough

Example 1 starts with `[1,2,3,4,5]`.
The table shows the processed odd and even prefixes; their tail links can still point into unprocessed nodes until rewiring finishes.

| iteration | odd chain | even chain | links changed |
| ---: | --- | --- | --- |
| start | `[1]` | `[2]` | remember even head 2 |
| 1 | `[1,3]` | `[2,4]` | connect 1 to 3, then 2 to 4 |
| 2 | `[1,3,5]` | `[2,4]` | connect 3 to 5, even reaches null |
| finish | `[1,3,5,2,4]` | appended | link 5 to even head 2 |

## Complexity

- Time: O(n), because each link is updated during one traversal.
- Space: O(1), using a fixed number of existing node pointers.

## Edge cases

An empty list returns null.
A one-node list has no even chain and remains unchanged.
An even-length list ends with an even tail before concatenation.
Node values are never inspected, so duplicates and negatives are unaffected.

## Common mistakes

- Losing `even_head` makes the final concatenation impossible.
- Updating even links before advancing odd can create a cycle.
- Reordering by values instead of positions violates the problem definition.

## Language notes

Python and Java both mutate the original `ListNode` links.
Java uses explicit `ListNode` variables, while Python's names mirror the same chain roles.
The returned head stays the original first node because the odd-position chain begins there.
