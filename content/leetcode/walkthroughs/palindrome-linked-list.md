## Intuition

A linked list palindrome has matching values from both ends, but the list has no backward links.
Find the midpoint, reverse the second half in place, and compare it with the first half.
The reversed half exposes the values in the needed order without an array.

## Brute force

Copying every node value into an array and comparing mirrored positions takes O(n) time and O(n) space.
Repeatedly scanning from the head to find matching tail nodes takes O(n²), while midpoint reversal stays linear.

## Approach

1. Advance `slow` one node and `fast` two nodes to find the second-half start.
2. Reverse links from `slow` into `previous` (Java calls this pointer `reversedSecondHalf`).
3. Compare values from `head` and the reversed half.
4. Return false at the first mismatch and true if every reversed-half node matches.

## Walkthrough

Example 1 uses `[1,2,2,1]`.

| stage | state |
| --- | --- |
| midpoint search | `slow` reaches the second `2`, while `fast` reaches null |
| reverse suffix | suffix `[2,1]` becomes `previous = [1,2]` |
| compare 1 | first value 1 equals reversed value 1 |
| compare 2 | second value 2 equals reversed value 2 |

Every value in the reversed half matches, so the result is true.

## Complexity

- Time: O(n), for midpoint discovery, reversal, and comparison.
- Space: O(1) auxiliary, using pointers and reusing the existing links.

## Edge cases

An empty or one-node list is a palindrome because no comparison fails.
Even and odd lengths both work because only the reversed second half is compared.
The first mismatch returns immediately.
The method does not allocate replacement nodes.

## Common mistakes

- Reversing from the head destroys the first-half traversal.
- Comparing only until both full lists end can compare the wrong number of nodes for odd lengths.
- Losing `slow.next` before saving it disconnects the unreversed suffix.

## Language notes

Python and Java use the harness-provided `ListNode` and mutate `next` pointers.
Java names the reversed pointer `reversedSecondHalf` to make its role explicit.
Neither implementation restores the list after checking, which is acceptable for this judge contract.
