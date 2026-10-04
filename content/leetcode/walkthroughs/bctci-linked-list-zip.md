## Intuition

Interleaving is a matter of changing links, not copying values.
Maintain the last attached node and repeatedly attach one node from each input, preserving the remaining head of each chain before overwriting links.

## Brute force

Copying all values into an array and rebuilding nodes would produce the right sequence but violate the node reuse requirement.
Repeatedly finding the current output tail would also introduce unnecessary traversal work.

## Approach

Create a temporary `dummy` and set `tail` to it.
While both heads exist, link the first head, advance it, and move `tail`; repeat for the second head.
Finally connect the untouched remainder of whichever input is nonempty and return `dummy.next`.

## Walkthrough

Example 1 attaches nodes 1 and 2, then nodes 3 and 4, then nodes 5 and 6.
Both input heads become null after the third pair.
The resulting chain is `[1, 2, 3, 4, 5, 6]`, using the original six data nodes.

## Complexity

For lengths n and m, the loop performs O(min(n, m)) link operations and attaches the remainder in constant time.
O(n + m) is a valid overall upper bound, including output traversal.
Auxiliary space is O(1).

## Edge cases

If one list is empty, the other becomes the result immediately.
If both are empty, `dummy.next` is null.
Unequal lengths leave the longer tail in its original order.
Equal values still represent distinct nodes to preserve.

## Common mistakes

Save a head's next node before replacing that node's outgoing link.
Do not allocate replacement data nodes.
Start with the first list as required, and remember to attach the remaining suffix after pairwise interleaving stops.

## Language notes

Both Python and Java allocate only a sentinel node that is excluded from the result.
The harness supplies `ListNode` and serializes the returned chain.
The original heads no longer describe independent unchanged lists because the existing next pointers are rewired.
