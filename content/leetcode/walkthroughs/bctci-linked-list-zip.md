## Intuition

The desired order alternates existing nodes from two lists.
Rewire links while preserving each list's next unread node before overwriting any connection.
Once one list ends, its remaining partner suffix is already in the correct order.

## Brute force

Copying values into a fresh list produces the right sequence but violates the node-reuse requirement.
Repeatedly finding the output tail would also add unnecessary quadratic work.

## Approach

Use a dummy node and a tail pointer.
While both heads exist, attach head1, advance head1 to its original next node, and move tail.
Then perform the same steps for head2.
After the loop, connect tail.next to the nonempty remainder, or null when both are empty.
Return dummy.next.
The processed output alternates correctly, and both head variables always identify the first unused nodes of their original lists.
The dummy is merely a temporary anchor and is excluded from the returned chain.

## Walkthrough

```text
Input: head1 = [1, 3, 5], head2 = [2, 4, 6]
Output: [1, 2, 3, 4, 5, 6]
```

Example 1 first attaches 1 from the first list and 2 from the second.
The unread heads become 3 and 4, which are attached next.
The final pair 5 and 6 completes the chain.
Both heads then become null, so the final tail next pointer is null.
The result is `[1, 2, 3, 4, 5, 6]` using the original six nodes.

## Complexity

Pointer work is O(min(n, m) + 1), since the remaining suffix is attached directly without traversal.
This is also bounded by O(n + m).
Extra working space is O(1), excluding the reused nodes.

## Edge cases

If one input is empty, return the other directly through the dummy link.
Unequal lengths retain the longer list's remaining order.

## Common mistakes

Advance the unread head before rewriting its next link.
Allocating replacement output nodes fails the identity requirement.

## Language notes

Python and Java perform the same ordered pointer updates with the harness ListNode type.
Both mutate the original lists' links as required for interleaving.
