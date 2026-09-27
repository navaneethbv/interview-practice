## Intuition

The method receives the node itself but has no predecessor and cannot change the head reference.
Copy the next node's value into the selected node.
Then bypass the next node.
From the list's observable sequence, the selected node now represents its successor and the successor is removed.

## Brute force

If the head were available, a conventional solution could walk until it found the predecessor and then change its next link.
That takes O(n) time and requires access to the list head.
The given signature provides neither the head nor a way to replace it, so copying from the successor is the required constant-time technique.

## Approach

1. Read node.next.val into node.val.
2. Set node.next to node.next.next.
3. The selected node is guaranteed to be non-tail, so node.next exists before the copy.
4. The judge then observes the list through its retained root reference.

## Walkthrough

In Example 1, the list is [4,7,2,9] and the selected node contains 7.
Copying its successor changes that node's value to 2.
Linking it to the successor's successor skips the old 2 node and leaves [4,2,9].
The method returns nothing.
The same operation works when the selected node is the head because the harness passes that node as the retained root.

## Complexity

The operation takes O(1) time and O(1) extra space.
It changes one value and one next link.
It does not scan the list or allocate another node.

## Edge cases

The selected node may be the first node in the provided list.
It may not be the tail, as required by the contract.
Signed extreme values are copied without arithmetic.
The selected node's original identity remains in the list while its old value disappears.

## Common mistakes

Do not try to set the selected node variable to its next node, because that does not change the caller's link.
Do not read from node.next after bypassing it.
Do not search for a predecessor that the method never received.
Do not return a new head from this void method.

## Language notes

Python and Java both use the ListNode val and next fields supplied by the judge.
The Java method returns void exactly as the spec requires.
The references preserve links before and after the copied successor.
